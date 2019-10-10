const express = require('express');
const fortunes = require('./data/fortunes.json');

const port = 3000;

const app = express();

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
