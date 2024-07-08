const paymentRepository = require('../repository/paymentRepository');

exports.createPayment = async (paymentData) => {
  return await paymentRepository.createPayment(paymentData);
};
