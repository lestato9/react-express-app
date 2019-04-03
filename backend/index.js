const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {mongoURL} = require(`${__dirname}/config/keys`);
const shoppingItems = require(`${__dirname}/routes/api/shoppingItems`);

const app = express();

app.use(bodyParser.json());
app.use('/api/shopping-items', shoppingItems);

mongoose
  .connect(mongoURL, {useNewUrlParser: true})
  .then(() => console.log('Connected MongoDB'))
  .catch((err) => console.error(err))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express is running on port ${port}`));

