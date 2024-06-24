const adminService = require('../service/adminAuthService');
const { generateResetCode } = require('../utils/token');
const { sendResetEmail } = require('../service/resetEmailService');

const adminAuth = {
  login: async (request, reply) => {
    try {
      const adminData = request.body;
      const data = await adminService.login(adminData);
      if (data) {
        const token = generateResetCode(data.userName);

        await adminService.storeAdminToken(token, data.userName);
        reply.code(200).send({ message: 'Login Success', token, data });
      } else {
        reply.code(401).send({ message: 'Failed to Login' });
      }
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },
  
  logout: async (request, reply) => {
    try {
      const { token, userName } = request.body; // Include userName in the body
      const isValidToken = await adminService.validateAdminToken(token, userName);
      if (isValidToken) {
        await adminService.logout(userName);
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
      if(email === "rajaasgharali009@gmail.com"){
        const code = generateResetCode();
        await adminService.saveResetCode(email, code);
        await sendResetEmail(email, code);
        reply.code(200).send({ message: 'Password reset code sent.' });
      } else {
        reply.send({ message: "Invalid Email Address" });
      }
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },

  verifyResetCode: async (request, reply) => {
    try {
      const { email, code } = request.body;
      const isCodeValid = await adminService.validateResetCode(email, code);
      if (isCodeValid) {
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
      const { email, code, newPassword } = request.body;
      const isCodeValid = await adminService.validateResetCode(email, code);
      if (isCodeValid) {
        await adminService.updatePassword(email, newPassword);
        reply.code(200).send({ message: 'Password reset successfully.' });
      } else {
        reply.code(400).send({ message: 'Invalid or expired code.' });
      }
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  },
};

module.exports = {adminAuth} ;
