/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const APIKey = require('../config');
const axios = require('axios');
const parseString = require('xml2js').parseString;
const puppeteer = require('puppeteer');
const preparePageForTests = require('./preparePageForTests')

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
      res.status(200).json(data);
    }
  });
});

app.get('/models', (req, res) => {
  db.retrieveModels(req.query.selectedMake, (err, data) => {
    if (err) {
      console.log('Error querying models.');
      res.sendStatus(500);
    } else {
      console.log(`Car models for "${req.query.selectedMake}" queried successfully.`);
      res.status(200).json(data);
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
        console.log(`Zip code: ${req.query.zipCode} validation successful.`);
        res.status(200).json(result.CityStateLookupResponse.ZipCode[0]);
      }
    });
  } catch(error) {
    console.log(`Error with zip code validation. Error: ${error}`);
  }
});

app.post('/carSubmission', (req, res) => {
  (async ({make, model, zipCode}) => {
    try{
      console.log(`Starting incentives retrieval for ${make}-${model}-${zipCode}`);

      let currYear = new Date().getFullYear();
      const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
      });

      const page = await browser.newPage();
      await preparePageForTests(page);
      await page.setViewport({ width: 850, height: 1400});

      let url = `https://www.edmunds.com/${make}/${model}/${currYear}/deals/`
      await page.goto(url, {waitUntil: 'networkidle2'});

      let selector = '.size-16.text-gray-darker.pl-2.search-by-zip-input.size-16.form-control-sm.form-control'
      await page.waitForSelector(selector, {visible: true});

      // Setting Zipcode
      await page.$eval(selector, (el, zipCode) => {
        el.value = zipCode;
      }, zipCode);
      await page.keyboard.press('Enter');

      // Clicking incentives tab
      await page.click(`div[name="incentives-financing"]`);
      await page.screenshot({path: `${make}-${model}-${zipCode}.png`, type: 'png'});
      await browser.close();
      
      console.log(`Retrieved incentives for ${make}-${model}-${zipCode}`);
      res.sendStatus(200);
    } catch(error) {
      console.log(`Error with puppetter. ${error}`);
    }
  })({make: req.query.make, model: req.query.model, zipCode: req.query.zipCode});
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000!');
});
