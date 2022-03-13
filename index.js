const app = require('express')();
const cors = require('cors');

app.enable('trust proxy');
app.use(cors());

// const mongoose = require('mongoose');

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

const connectWithRetry = () => {
  const mongoConnectUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`;

  console.error('mongoConnectUrl', mongoConnectUrl);
  
  // mongoose.connect(mongoConnectUrl, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  //   .then(() => { console.log('connected to DB'); })
  //   .catch((e) => { 
  //     console.error(e); 
  //     setTimeout(connectWithRetry, 5000);
  //   })
}

connectWithRetry();

app.get('/', (req, res) => {
  console.log(req.headers);
  res.send(`mode: ${process.env.NODE_ENV} (DEV env with swarm)`);
})

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Server running on port ${port}`); });