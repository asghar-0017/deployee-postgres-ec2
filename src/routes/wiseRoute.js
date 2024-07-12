const paymentController = require('../controller/wisecontroller');

const wiseRoute = async (fastify) => {
    fastify.post('/create-recipient', paymentController.createRecipient);
    fastify.post('/create-transfer', paymentController.createTransfer);
};

module.exports = wiseRoute;
