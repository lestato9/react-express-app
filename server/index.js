const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const { mongoURL } = require(`./config/keys`);
const requireAuth = require(`./middlewares/requireAuth`);
const shoppingItemsRouter = require(`./routes/api/shoppingItems`);
const authRouter = require(`./routes/api/auth`);

const app = express();

app.use(express.json());
app.use(cookieParser());

// define api routing here
app.use('/api/shopping-items', requireAuth, shoppingItemsRouter);
app.use('/api/auth', authRouter);

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
  .catch((err) => console.error(err.name, err.message));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express is running on port ${port}`));

