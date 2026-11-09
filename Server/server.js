const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  passsword: "",
  database: "rezerwacji"
})

app.get('/', (req, res) => {
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

app.get('/rezerwacjeEdit', (req, res) => {

  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  const sql = "SELECT * FROM `rezerwacje` WHERE id = ?";

  
  db.query(sql, [id], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/rezerwacje', (req, res) => {
  const { nazwa, pojemnosc, rodzaj, data } = req.body;

  if (!nazwa || !pojemnosc || !rodzaj || !data) {
    return res.status(400).json({ status: "error", message: "Wszystkie pola są wymagane!" });
  }

  const sql = "INSERT INTO rezerwacje (Imie_uzytkownika, nazwa, pojemnosc, rodzaj_id, date) VALUES (?, ?, ?, ?, ?)";
  const values = ["TestUser1", nazwa, Number(pojemnosc), Number(rodzaj), data];

  db.query(sql, values, (err, result) => {
    if (err) {
      
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Added successfully" });
  });
});

app.delete('/rezerwacje', (req, res) => {
  
  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  const sql = "DELETE FROM rezerwacje WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Critical error MySQL:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Deleted successfully" });
  });
});

app.delete('/sala', (req, res) => {
  
  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  const sql = "DELETE FROM sala WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Critical error MySQL:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});