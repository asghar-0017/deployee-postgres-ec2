const {adminAuth} = require('../controller/adminAuthController');

const AdminAuthRoute = async (fastify) => {
    fastify.post('/admin-auth', adminAuth.login);
    fastify.post('/forgot-password', adminAuth.forgotPassword);
    fastify.post('/verify-reset-code', adminAuth.verifyResetCode);
    fastify.put('/reset-password', adminAuth.resetPassword);
    fastify.post('/logout', { preHandler: adminAuth.authenticate }, adminAuth.logout);
    fastify.post('/verify-token', adminAuth.verifyToken); 

};


module.exports = AdminAuthRoute;
