// Sample code to demonstrating how to
// call "helper" function to interact with DB
// and how to close the DB connection when the server 
// shut down (when user clicks CTRL-C)

const express = require('express');
const app = express();
const db = require('./js/db');

const model = require('./js/model');

app.get('/getUser', async function(req, res) {
  let user_id = 1;  
  try {
    let user = await model.getUser(user_id);
    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).send('Operation failed');
  }
});

//Task 1
app.get('/getItems', async function(req, res){
  let minprice = req.query['minprice'];
  try {
    let sql = 'SELECT item_id, title, price FROM items WHERE price >= ?';
    let data = [minprice];
    let results = await db.query(sql,data);
    if (results.length == 0)
      res.json(null);
    else
      res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Operation failed');
  }
});

//Task 2
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); 

app.post('/addItem', async function(req,res){
  let title = req.body['title'], price = req.body['price'],
      desc = req.body['description'], img = req.body['img_url'];
  try {
    let check = 'SELECT item_id FROM items WHERE title = ?';
    let t_value = [title];
    let check_res = await db.query(check,t_value);
    if (check_res.length != 0)
      res.status(500).send('Duplicate');
    else {
      let sql = 'INSERT INTO items (title, price, description, imgUrl) VALUES (?, ?, ?, ?)';
      let data = [title,price,desc,img];
      let result = await db.query(sql, data);
      res.status(201).send('Success');
    }  
  } catch (err) {
    console.error(err);
    res.status(500).send('Operation failed');
  }
});

//Task 3
app.post('/task3', async function(req,res){
  let title = req.body['title'], price = req.body['price'],
      desc = req.body['description'], img = req.body['img_url'];
  try {
    let check = 'SELECT item_id FROM items WHERE title = ?';
    let t_value = [title];
    let check_res = await db.query(check,t_value);
    if (check_res.length != 0)
      res.status(500).send('Duplicate');
    else if (parseFloat(price).toString() == 'NaN' || Number(price) < 0 || 
              ((price.toString()).indexOf('.') != -1 && String(price).split('.')[1].length > 2)) {
      //check if input price is not a number, is a negative number, is with more than 2 decimal places(if has decimal point) 
        res.status(500).send('Invalid price');
    }
    else {
        let sql = 'INSERT INTO items (title, price, description, imgUrl) VALUES (?, ?, ?, ?)';
        let data = [title,price,desc,img];
        let result = await db.query(sql, data);
        res.status(201).send('Success');
    } 
  } catch (err) {
    console.error(err);
    res.status(500).send('Operation failed');
  }
});

let server = app.listen(8080);


// Note: Code originally obtained from
//   Graceful shutdown in NodeJS
//   https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357

// When CTRL-C signal received
process.on('SIGINT', () => {
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    db.end().then(()=> console.log('DB connection closed'));
  });
});

// When server is terminated gracefully
process.on('SIGTERM', () => {
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    db.end().then(()=> console.log('DB connection closed'));
  });
});
