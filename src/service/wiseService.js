const axios = require('axios');
require('dotenv').config();

const wiseApiUrl = process.env.WISE_API_URL;
const wiseApiToken = process.env.WISE_API_KEY;

async function createRecipient(accountHolderName, currency, accountNumber) {
  const url = `${wiseApiUrl}/v1/accounts`;
  const headers = {
    Authorization: `Bearer ${wiseApiToken}`,
    'Content-Type': 'application/json'
  };

  const payload = {
    currency: currency,
    type: 'sort_code', // Adjust this based on the actual type required by Wise
    profile: process.env.WISE_PROFILE_ID,
    accountHolderName: accountHolderName,
    details: {
      accountNumber: accountNumber,
      sortCode: '123456' // Adjust this based on actual requirements
    }
  };

  console.log("Payload for creating recipient:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data.id; // Assuming the response contains the recipient ID
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}

async function createTransfer(recipientId, amount, currency) {
  const url = `${wiseApiUrl}/v1/transfers`;
  const headers = {
    Authorization: `Bearer ${wiseApiToken}`,
    'Content-Type': 'application/json'
  };

  const payload = {
    targetAccount: recipientId,
    quoteUuid: await createQuote(amount, currency),
    customerTransactionId: `${Math.random()}`.slice(2),
    details: {
      reference: 'Payment',
      transferPurpose: 'verification.transfers.purpose.pay.bills',
      sourceOfFunds: 'verification.source.of.funds.other'
    }
  };

  console.log("Payload for creating transfer:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data.id; // Assuming the response contains the transfer ID
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}

async function createQuote(amount, currency) {
  const url = `${wiseApiUrl}/v1/quotes`;
  const headers = {
    Authorization: `Bearer ${wiseApiToken}`,
    'Content-Type': 'application/json'
  };

  const payload = {
    sourceCurrency: currency,
    targetCurrency: currency,
    sourceAmount: amount,
    profile: process.env.WISE_PROFILE_ID
  };

  console.log("Payload for creating quote:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data.id; // Assuming the response contains the quote ID
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}

module.exports = {
  createRecipient,
  createTransfer,
};
