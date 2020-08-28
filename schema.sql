DROP DATABASE IF EXISTS carcentives;

CREATE DATABASE carcentives;

USE carcentives;

CREATE TABLE makesAndModels (
  id int NOT NULL AUTO_INCREMENT,
  make varchar(50),
  models varchar(50),
  PRIMARY KEY (id)
);

-- CREATE TABLE models (
--   id int NOT NULL AUTO_INCREMENT,
--   makeId varchar(50),
--   model varchar(50),
--   PRIMARY KEY (id),
--   FOREIGN KEY (makeId) REFERENCES makes(make)
-- );

CREATE TABLE userInputs (
  id int NOT NULL AUTO_INCREMENT,
  make varchar(50) NOT NULL,
  model varchar(50) NOT NULL,
  zipCode int NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

-- INSERT INTO makes(make) VALUES('Honda');
-- INSERT INTO makes(make) VALUES('Land Rover');

INSERT INTO makesAndModels(make, models) VALUES('Honda', 'Clarity');
INSERT INTO makesAndModels(make, models) VALUES('Honda', 'Accord');
INSERT INTO makesAndModels(make, models) VALUES('Honda', 'Civic');
INSERT INTO makesAndModels(make, models) VALUES('Honda', 'CR-V');
INSERT INTO makesAndModels(make, models) VALUES('Honda', 'Odyssey');
INSERT INTO makesAndModels(make, models) VALUES('Honda', 'Fit');
INSERT INTO makesAndModels(make, models) VALUES('Honda', 'HR-V');
INSERT INTO makesAndModels(make, models) VALUES('Honda', 'Pilot');

INSERT INTO makesAndModels(make, models) VALUES('Land Rover', 'Range Rover');
INSERT INTO makesAndModels(make, models) VALUES('Land Rover', 'Range Rover Sport');
INSERT INTO makesAndModels(make, models) VALUES('Land Rover', 'Range Rover Velar');
INSERT INTO makesAndModels(make, models) VALUES('Land Rover', 'Range Rover Evoque');
INSERT INTO makesAndModels(make, models) VALUES('Land Rover', 'Discovery');
INSERT INTO makesAndModels(make, models) VALUES('Land Rover', 'Discovery Sport');
