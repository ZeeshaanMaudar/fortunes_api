const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes.json');

const app = express();

app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {

  const random_index = Math.floor(Math.random() * fortunes.length);
  
  const random_fortune = fortunes[random_index];
  res.json(random_fortune);
});

app.get('/fortunes/:id', (req, res) => {
  res.json(fortunes.find(({ id }) => id == req.params.id));
});

app.post('/fortunes', (req, res) => {

  const { message, lucky_number, spirit_animal } = req.body;

  const fortuneIds = fortunes.map(({ id }) => id);

  const uniqueNewId = fortuneIds.length > 0 ? Math.max(...fortuneIds) + 1 : 0;

  const fortune = { id: uniqueNewId, message, lucky_number, spirit_animal };

  const newFortunes = fortunes.concat(fortune);

  fs.writeFile('./data/fortunes.json', JSON.stringify(newFortunes), err => console.log(err));

  res.json(newFortunes);
});

app.put('/fortunes/:id', (req, res) => {
  const { id } = req.params;
  const { message, lucky_number, spirit_animal } = req.body;

  const oldFortune = fortunes.find(fortune => fortune.id == id);

  if(message) oldFortune.message = message;
  if(lucky_number) oldFortune.lucky_number = lucky_number;
  if(spirit_animal) oldFortune.spirit_animal = spirit_animal;

  fs.writeFile('./data/fortunes.json', JSON.stringify(fortunes), err => console.log(err));

  res.json(fortunes);
  
});

module.exports = app;
