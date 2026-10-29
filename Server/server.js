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

app.delete('/rezerwacje', (req, res) => {
  // Хватаем ID из query-параметров строки (переменная долетит со 100% гарантией)
  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  const sql = "DELETE FROM rezerwacje WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Критическая ошибка MySQL:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Deleted successfully" });
  });
});

app.delete('/sala', (req, res) => {
  // Хватаем ID из query-параметров строки (переменная долетит со 100% гарантией)
  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  const sql = "DELETE FROM sala WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Критическая ошибка MySQL:", err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});