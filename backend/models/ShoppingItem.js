const mongoose = require('mongoose');
const {Schema} = mongoose;

const shoppingItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ShoppingItem = mongoose.model('shoppingItem', shoppingItemSchema);


module.exports = ShoppingItem;
