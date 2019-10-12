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

const writeFortunes = (json) => {
  fs.writeFile('./data/fortunes.json', JSON.stringify(json), err => console.log(err));
}

app.post('/fortunes', (req, res) => {

  const { message, lucky_number, spirit_animal } = req.body;

  const fortuneIds = fortunes.map(({ id }) => id);

  const uniqueNewId = fortuneIds.length > 0 ? Math.max(...fortuneIds) + 1 : 0;

  const fortune = { id: uniqueNewId, message, lucky_number, spirit_animal };

  const newFortunes = fortunes.concat(fortune);

  writeFortunes(newFortunes);

  res.json(newFortunes);
});

app.put('/fortunes/:id', (req, res) => {
  const { id } = req.params;

  const oldFortune = fortunes.find(fortune => fortune.id == id);

  ['message', 'lucky_number', 'spirit_animal'].forEach(key => {
    if(req.body[key]) oldFortune[key] = req.body[key];
  });

  writeFortunes(fortunes);

  res.json(fortunes);
  
});

app.delete('/fortunes/:id', (req, res) => {
  const { id } = req.params;

  const newFortunes = fortunes.filter(fortune => fortune.id != id);

  writeFortunes(newFortunes);

  res.json(newFortunes);
})

module.exports = app;
