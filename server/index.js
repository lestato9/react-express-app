const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { mongoURL } = require(`./config/keys`);

const app = express();

app.use(express.json());
// define api routing here
app.use('/api/shopping-items', require(`./routes/api/shoppingItems`));
app.use('/api/auth', require(`./routes/api/auth`));
app.use(express.static(path.join(__dirname, '../client/build')));

// send static assets
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected MongoDB'))
  .catch((err) => console.error(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express is running on port ${port}`));

