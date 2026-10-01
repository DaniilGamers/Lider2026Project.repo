const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 8000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  passsword: "",
  database: "rezerwacji"
})

app.get('/', (re, res) => {
  res.send('Hello World!');
});

app.get('/sala', (req, res) => {
  const sql = "SELECT * from sala";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/rezerwacje', (req, res) => {
  const sql = "SELECT * from rezerwacje";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});