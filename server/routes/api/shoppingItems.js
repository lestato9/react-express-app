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
    .catch(({ name, message }) => console.error(name, message));
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
    .catch(({ name, message }) => {
      res.json({ success: false });
      console.error(name, message)
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
    .catch(({ name, message }) => {
      res.status(404).json({ success: false });
      console.error(name, message);
    })
});


module.exports = router;
