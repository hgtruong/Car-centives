/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const db = require('../database');
// const items = require('../database-mongo');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/makes', (req, res) => {
  db.retrieveMakes((err, data) => {
    if (err) {
      console.log('Error querying makes.');
      res.sendStatus(500);
    } else {
      console.log('Car makes queried successfully.');
      res.json(data);
    }
  });
});

app.get('/models', (req, res) => {
  db.retrieveModels(req.query.selectedMake, (err, data) => {
    if (err) {
      console.log('Error querying models.');
      res.sendStatus(500);
    } else {
      console.log('Car models queried successfully.');
      res.json(data);
    }
  });
});

app.post('/userSubmit', (req, res) => {
  db.addUserSubmission(req.body, (err) => {
    if (err) {
      console.log('Error adding user submission.');
      res.sendStatus(500);
    } else {
      console.log('User submission added to database.');
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000!');
});
