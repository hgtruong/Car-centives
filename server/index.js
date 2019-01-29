/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/makes', (req, res) => {
  db.getMakes((err, data) => {
    if (err) {
      console.log('Error querying makes.');
      res.sendStatus(500);
    } else {
      console.log('Car makes queried successfully.');
      res.json(data);
    }
  });
});

app.post('/screenshot', (req, res) => {
  console.log('Screenshot request received.');
  const fileName = `${req.body.make}${req.body.model}${req.body.zipCode}`.split(' ').join('');

  puppeteer.launch().then(async (browser) => {
    const page = await browser.newPage();
    await page.goto(`${req.body.finalUrl}`, { waitUntil: 'networkidle0' });
    await page.waitFor(2000);
    await page.screenshot({
      path: `${__dirname}/../client/dist/screenshots/${fileName}.png`,
      clip: { x: 0, y: 0, width: 800, height: 2500 },
    });
    await browser.close().then(() => { res.json({ filePath: `/screenshots/${fileName}.png` }); });
  });
});

app.get('/models', (req, res) => {
  db.getModels(req.query.selectedMake, (err, data) => {
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

app.get('/userSubmit', (req, res) => {
  db.getUserSubmission(req.body, (err, result) => {
    if (err) {
      console.log('Error getting user submissions.');
      res.sendStatus(500);
    } else {
      console.log('User submissions queried successfully.');
      res.json(result);
    }
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000!');
});
