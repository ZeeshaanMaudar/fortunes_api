const express = require('express');
const fortunes = require('./data/fortunes.json');

const app = express();

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

module.exports = app;
