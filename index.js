const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');
const todosRoutes = require('./routes/todo');

// .env setup | Add a .env file in root dir if error, key=value
dotenv.config({ path: __dirname + '/.env' });
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

// Setup Mongoose
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('---- MongoDB connected ----');
  })
  .catch(err => {
    console.log(err);
  });
// Enable debugging in Mongoose
mongoose.set('debug', (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Route endpoints
app.use('/api/todos', todosRoutes);

// static files
app.use(express.static('./public'));

// listen to port
app.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT);
});
