const express = require('express');
const mongoose = require('mongoose');

const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/userRoutes');

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const app = express();

app.use(express.json());

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/auth', authRouter);


const connectWithRetry = () => {
  const mongoConnectUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`;

  mongoose.connect(mongoConnectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => { console.log('connected to DB'); })
    .catch((e) => { 
      console.error(e); 
      setTimeout(connectWithRetry, 5000);
    })
}

connectWithRetry();

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Server running on port ${port}`); });