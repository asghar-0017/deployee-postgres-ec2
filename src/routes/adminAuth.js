const {adminAuth} = require('../controller/adminAuthController');

const AdminAuthRoute = async (fastify) => {
    fastify.post('/admin-auth', adminAuth.login);
    fastify.post('/forgot-password', adminAuth.forgotPassword);
    fastify.post('/verify-reset-code', adminAuth.verifyResetCode);
    fastify.post('/reset-password', adminAuth.resetPassword);
    fastify.post('/logout', adminAuth.logout); 
};


module.exports = AdminAuthRoute;
