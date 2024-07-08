const axios = require('axios');
require('dotenv').config();

const wiseApiUrl = process.env.WISE_API_URL;
const wiseApiToken = process.env.WISE_API_KEY;

exports.createTransfer = async (amount, currency, recipientId) => {
  try {
    const url = `${wiseApiUrl}transfers`; // Remove the trailing slash after wiseApiUrl
    const headers = {
      Authorization: `Bearer ${wiseApiToken}`,
      'Content-Type': 'application/json'
    };

    const response = await axios.post(url, {
      amount: {
        value: amount,
        currency: currency
      },
      // quote and customerTransactionId may need valid values
      quote: 'your_quote_id', // Replace with actual value if needed
      customerTransactionId: 'your_transaction_id' // Replace with actual value if needed
    }, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating transfer:", error.message);
    throw error;
  }
};
