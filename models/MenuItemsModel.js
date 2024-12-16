const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageId: { type: String },
  price: { type: Number, required: true },
  rating: { type: String },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
