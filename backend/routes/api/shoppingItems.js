const express = require('express');
const ShoppingItem = require(`models/ShoppingItem`);
const router = express.Router();

// @route   GET api/shopping-items
// @desc    get all shopping items
// @access  Public
router.get('/', (req, res) => {
  ShoppingItem
    .find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((err) => console.error(err));
});

// @route   POST api/shopping-items/create
// @desc    creates shopping item
// @access  Public
router.post('/create', (req, res) => {
  const newItem = new ShoppingItem({
    name: req.body.name
  });

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.error(err))
});

// @route   DELETE api/shopping-items/delete
// @desc    deletes shopping item
// @access  Public
router.delete('/delete', (req, res) => {
  ShoppingItem
    .findById(req.body.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => console.err(err), res.status(404).json({ success: false }))
});


module.exports = router;
