const paymentService = require('../service/paymentService');

exports.createPayment = async (request, reply) => {
  try {
    const paymentData = request.body;
    const paymentResponse = await paymentService.createPayment(paymentData);
    reply.send(paymentResponse);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
