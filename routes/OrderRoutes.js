const express = require('express');
const Order = require('../models/Order'); 

const router = express.Router();


router.post('/order', authMiddleware, async (req, res) => {
  const { items, totalCost } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id, 
      items,
      totalCost,
    });

    await newOrder.save(); 

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
