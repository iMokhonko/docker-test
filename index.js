const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`)
  .then(() => { console.log('connected to DB'); })
  .catch((e) => { console.error(e); })

app.get('/', (req, res) => {
  res.send(`mode: ${process.env.NODE_ENV}`);
})

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Server running on port ${port}`); });