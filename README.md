Node.js, Express & MySQL OR Mongoose: Simple Add, Edit, Delete, View (CRUD)
========

A simple and basic CRUD application (Create, Read, Update, Delete) using Node.js, Express, MySQL & EJS Templating Engine.

**Blog:** [Node.js, Express & MySQL Or Mongoose: Simple Add, Edit, Delete, View (CRUD)]

**Creating database and table**

```
create database node-crud;

use node-crud;

CREATE TABLE users (
id int(11) NOT NULL auto_increment,
name varchar(100) NOT NULL,
email varchar(100) NOT NULL,
PRIMARY KEY (id)
);
```
