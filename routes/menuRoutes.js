const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); 
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
});

module.exports = router;
