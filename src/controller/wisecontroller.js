const wiseService = require('../service/wiseService');

exports.createRecipient = async (req, reply) => {
  try {
    const { accountHolderName, currency, accountNumber } = req.body;
    const recipientId = await wiseService.createRecipient(accountHolderName, currency, accountNumber);
    reply.status(200).send({ recipientId });
  } catch (error) {
    console.error("Error in createRecipient:", error.message);
    reply.status(500).send({ error: error.message });
  }
};

exports.createTransfer = async (req, reply) => {
  try {
    const { recipientId, amount, currency } = req.body;
    const transferId = await wiseService.createTransfer(recipientId, amount, currency);
    reply.status(200).send({ transferId });
  } catch (error) {
    console.error("Error in createTransfer:", error.message);
    reply.status(500).send({ error: error.message });
  }
};
