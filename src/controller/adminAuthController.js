const adminService = require('../service/adminAuthService');
const { generateResetCode } = require('../utils/token');
const { sendResetEmail } = require('../service/resetEmailService');
const redis = require('../infrastructure/redis');

const jwt = require('jsonwebtoken');

const secretKey = process.env.SCERET_KEY; // Replace with your secret key


const adminAuth = {
  login: async (request, reply) => {
    try {
      const adminData = request.body;
      const data = await adminService.login(adminData);
      console.log("token",data.token)
      if (data) {
        await adminService.storeAdminToken(data.token);
        reply.code(200).send({ message: 'Login Success', data });
      }
    } catch (error) {
      throw error
    }
  },
  
  logout: async (request, reply) => {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const isValidToken = await adminService.validateAdminToken(token);
      if (isValidToken) {
        await adminService.logout(token);
        reply.code(200).send({ message: 'Logout Success' });
      } else {
        reply.code(400).send({ message: 'Failed to Logout: Invalid token or user.' });
      }
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },

  forgotPassword: async (request, reply) => {
    try {
      const { email } = request.body;
      if(email === process.env.ADMIN_EMAIL){
        const code = generateResetCode();
        await adminService.saveResetCode(code);
        await sendResetEmail(email, code);
        reply.code(200).send({ message: 'Password reset code sent.' });
      } else {
        reply.code(400).send({ message: "Invalid Email Address" });
      }
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },

  verifyResetCode: async (request, reply) => {
    try {
      const { code } = request.body;
      const isCodeValid = await adminService.validateResetCode(code);
      if (isCodeValid) {
        await redis.del(`${code}:resetCode`);
        reply.code(200).send({ message: 'Code verified successfully.' });

      } else {
        reply.code(400).send({ message: 'Invalid or expired code.' });
      }
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },

  resetPassword: async (request, reply) => {
    try {
      const { newPassword } = request.body;
        await adminService.updatePassword(newPassword);
        reply.code(200).send({ message: 'Password reset successfully.' });
 
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },
  authenticate: async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.code(401).send({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const isValidToken = await adminService.validateAdminToken(token);
      if (!isValidToken) {
        return reply.code(401).send({ message: 'Invalid token' });
      }

      const storedToken = await redis.get(`admin:${token}`);
      if (storedToken !== token) {
        return reply.code(401).send({ message: 'Token mismatch' });
      }
  

    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },


  verifyToken: async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.code(401).send({code:401, message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      
      const storedToken = await redis.get(`admin:${token}`);
      if (storedToken !== token) {
        return reply.code(401).send({code:401, message: 'Token mismatch' });
      }

      const user = await adminService.findUserById(decoded.userName);
      if (!user) {
        return reply.code(401).send({ code:401,message: 'Invalid token' });
      }

      return reply.code(200).send({code:200, isValid: true });
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return reply.code(401).send({code:401, message: 'Invalid token' });
      }
      return reply.code(500).send({code:401, message: 'Internal Server Error', error: error.message });
    }
  },
};


module.exports = {adminAuth} ;
