const paymentController = require('../controller/paymentController');

async function paymentRoutes(fastify, options) {
  fastify.post('/create-payment', paymentController.createPayment);
}

module.exports = paymentRoutes;
