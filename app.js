const express = require('express');
const fortunes = require('./data/fortunes.json');

const app = express();

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {
  console.log('requesting random fortunes');

  const random_index = Math.floor(Math.random() * fortunes.length);
  
  const random_fortune = fortunes[random_index];
  res.json(random_fortune);
});

module.exports = app;
