const stripe = require('../../stripe')
exports.createPayment = async (paymentData) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_method: paymentData.paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      return_url: 'http://www.softmarksolutions.com'
    });

    return paymentIntent;
  } catch (error) {
    throw new Error('Error processing payment: ' + error.message);
  }
};


