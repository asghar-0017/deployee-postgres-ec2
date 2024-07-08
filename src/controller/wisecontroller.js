const paymentService = require('../service/wiseService');

exports.createTransfer = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Debugging line
    const data = req.body;
    const transfer = await paymentService.createTransfer(data);
    res.status(200).json(transfer);
  } catch (error) {
    console.error("Error in createTransfer:", error); // Log the error for debugging
    throw error
  }
};
