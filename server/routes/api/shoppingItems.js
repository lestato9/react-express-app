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
    .then(() => res.json({ success: true }))
    .catch((err) => {
      res.json({ success: false });
      throw new Error(err);
    })
});

// @route   DELETE api/shopping-items/delete/:id
// @desc    deletes shopping item
// @access  Public
router.delete('/delete/:id', (req, res) => {
  ShoppingItem
    .findById(req.params.id)
    .then((item) => {
      item.remove().then(() => res.json({ success: true }))
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ success: false });
    })
});


module.exports = router;
