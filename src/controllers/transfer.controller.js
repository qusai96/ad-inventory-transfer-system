const transferService = require('../services/transfer.service');

exports.transferStock = async (req, res) => {
  const { productId, fromLocationId, toLocationId, quantity } = req.body;

  if (!productId || !fromLocationId || !toLocationId || !quantity) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const result = await transferService.transferStock(productId, fromLocationId, toLocationId, quantity);
    return res.json({ success: true, message: result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
