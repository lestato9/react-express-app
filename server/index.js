const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { mongoURL } = require(`./config/keys`);
const shoppingItems = require(`./routes/api/shoppingItems`);

const app = express();

app.use(bodyParser.json());
// define api routing here
app.use('/api/shopping-items', shoppingItems);
app.use(express.static(path.join(__dirname, '../client/build')));

// send static assets
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log('Connected MongoDB'))
  .catch((err) => console.error(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express is running on port ${port}`));

