require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const cookieParser = require('cookie-parser');
const router = require('./router');
const seedData = require('./Seed');
const { verifyToken } = require('./middleware/verifyToken');

const app = express();
const port = 8080;

const mongoUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
}).then(res => console.log(`Connection Succesful ${res}`))
  .catch(err => console.log(`Error in DB connection ${err}`));

const ORIGINS_WHITELIST = [
  'http://localhost:3000',
  'http://0.0.0.0:3000',
  'http://localhost',
  'http://0.0.0.0:8080',
  'http://localhost:8080'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ORIGINS_WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS policy'));
    }
  }, 
  credentials: true,
  optionSuccessStatus: 200,
}));

app.use(cookieParser(process.env.JWT_SECRET));

// dont verify images right now
app.use('/uploads', express.static('/uploads'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1>Trippi Backend is running!</h1>`)
});

app.get('/seed', (req, res) => {
  res.send(`
    <h1>Seed Data</h1>
    <p>Seeding data will delete all old data and reset the data to the original data</p>
    <p>Are you sure you want to continue?</p>
    <a href="/seed-confirm">Yes, I want to reset ALL data!</a>
    <br/>
    <a href="/">Nah I'm good</a>
    `)
});

app.get('/seed-confirm', (req, res) => {
  seedData();
  res.send(`
    <h1>Seeding Data. This could take sometime...</h1>
    `)
});

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
