### Schema

CREATE DATABASE secure;

USE secure;

CREATE TABLE Users
(
	id int(11) AUTO_INCREMENT NOT NULL,
	fname VARCHAR(50) NOT NULL ,
	lname VARCHAR(50) NOT NULL ,
	email VARCHAR(50 ) NOT NULL UNIQUE,
	passcode BINARY(255) NOT NULL,
	logged BOOLEAB,
	PRIMARY KEY (id) 
);

CREATE TABLE Posts
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	title varchar(50) NOT NULL,
	body text(50) NOT NULL,
	blogPost varchar(255) NOT NULL,
	categoty varchar(20),
	createdAt CHAR(10),
	updatedAt CHAR(10)
);
