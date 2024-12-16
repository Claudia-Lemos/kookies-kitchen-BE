require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItemsModel');
const menuData = require('./data/data.json');


console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await MenuItem.deleteMany(); 
    await MenuItem.insertMany(menuData); 
    console.log('Menu items seeded successfully');
    process.exit();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
