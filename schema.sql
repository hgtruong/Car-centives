DROP DATABASE IF EXISTS carcentives;

CREATE DATABASE carcentives;

USE carcentives;

CREATE TABLE makes (
  id int NOT NULL AUTO_INCREMENT,
  make varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE models (
  id int NOT NULL AUTO_INCREMENT,
  model varchar(50) NOT NULL,
  makeId int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (makeId) REFERENCES makes(id)
);

CREATE TABLE userInputs (
  id int NOT NULL AUTO_INCREMENT,
  make varchar(50) NOT NULL,
  model varchar(50) NOT NULL,
  zipCode int NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

INSERT INTO makes(make) VALUES('Honda');

INSERT INTO models(model, makeId) VALUES('Clarity Plug-In Hybrid', 1);
INSERT INTO models(model, makeId) VALUES('Accord Sedan', 1);
INSERT INTO models(model, makeId) VALUES('Civic Sedan', 1);
INSERT INTO models(model, makeId) VALUES('CR-V', 1);
INSERT INTO models(model, makeId) VALUES('Odyssey', 1);
INSERT INTO models(model, makeId) VALUES('FIT', 1);
INSERT INTO models(model, makeId) VALUES('HR-V', 1);
INSERT INTO models(model, makeId) VALUES('Civic Coupe', 1);
INSERT INTO models(model, makeId) VALUES('Civic Hatchback', 1);
INSERT INTO models(model, makeId) VALUES('Pilot', 1);
INSERT INTO models(model, makeId) VALUES('Civic Si Sedan', 1);
INSERT INTO models(model, makeId) VALUES('Civic Si Coupe', 1);