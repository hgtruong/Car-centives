const express = require('express');
const bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const items = require('../database');
// const items = require('../database-mongo');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000!');
});
