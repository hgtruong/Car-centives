const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'carcentives',
});

const getMakes = (callback) => {
  connection.query('SELECT DISTINCT make from makesAndModels;', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getModels = (selectedMake, callback) => {
  connection.query(`SELECT models from makesAndModels where make='${selectedMake}';`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const addUserSubmission = (userInput, callback) => {
  connection.query(`INSERT INTO userInputs(make, model, zipCode) VALUES('${userInput.make}','${userInput.model}', ${userInput.zipCode}); `, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getUserSubmission = (userInput, callback) => {
  connection.query('select * from userInputs;', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getMakes, getModels, addUserSubmission, getUserSubmission,
};
