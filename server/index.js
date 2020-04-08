/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const APIKey = require('../config');
const axios = require('axios');
const parseString = require('xml2js').parseString;

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

app.get('/validateZip', async (req, res) => {
  let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=`;
  try {
    const result = await axios({
      method: 'GET', 
      url:
      `
        ${url}
        <CityStateLookupRequest USERID="${APIKey.USPS_USER_ID}">
          <ZipCode ID='0'>
            <Zip5>${req.query.zipCode}</Zip5>
          </ZipCode>
        </CityStateLookupRequest>
      `
    });
    parseString(result.data, (err, result) => {
      if(err) {
        console.log('Error parsing Zip Code Lookup response');
        res.sendStatus(500);
      } else {
        res.json(result.CityStateLookupResponse.ZipCode[0]);
      }
    });
  } catch(error) {
    console.log('Error with zip code validation.');
    console.log(`Error is ${error}`)
  }
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
