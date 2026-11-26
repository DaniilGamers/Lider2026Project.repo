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

app.get('/historia', (req, res) => {
  const sql = "SELECT * FROM `historia` ORDER BY `id` DESC";
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
  const imieUzytkownika = "TestUser1";

  if (!nazwa || !pojemnosc || !rodzaj || !data) {
    return res.status(400).json({ status: "error", message: "Wszystkie pola są wymagane!" });
  }

  const sql1 = "INSERT INTO rezerwacje (Imie_uzytkownika, nazwa, pojemnosc, rodzaj_id, date) VALUES (?, ?, ?, ?, ?)";
  const values1 = [imieUzytkownika, nazwa, Number(pojemnosc), Number(rodzaj), data];

  db.query(sql1, values1, (err, result) => {
    if (err) {
      console.error("SQL1 Error:", err);
      return res.status(500).json({ status: "error", message: err.message });
    }
  });
  const sqlGetRodzaj = "SELECT rodzaj_sala FROM sala WHERE id = ?";

  const now = new Date();
  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'
  ];

  const day = now.getUTCDate();
  const month = months[now.getUTCMonth()];
  const year = now.getUTCFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const result = `${day} ${month} ${year} ${hours}:${minutes}`;

    db.query(sqlGetRodzaj, [Number(rodzaj)], (errSelect, rows) => {
      if (errSelect) {
        console.error("Select Error:", errSelect);
        return res.status(500).json({ status: "error", message: errSelect.message });
      }

    const rodzaj_sala = rows.length > 0 ? rows[0].rodzaj_sala : rodzaj;

    const opis = `${imieUzytkownika} stworzył rezerwacje dla ${rodzaj_sala}, ${result}`;
    const sql2 = "INSERT INTO `historia` (`opis`) VALUES (?)";

    db.query(sql2, [opis], (err2) => {
      if (err2) {
        console.error("SQL2 Error:", err2);
        return res.status(500).json({ status: "error", message: err2.message });
      }

      return res.json({ status: "success", message: "Added successfully" });
    });
});
});

app.put('/rezerwacje', (req, res) => {
  const { nazwa, pojemnosc, rodzaj, data } = req.body;
  const imieUzytkownika = "TestUser1";

  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  if (!nazwa || !pojemnosc || !rodzaj || !data) {
    return res.status(400).json({ status: "error", message: "Wszystkie pola są wymagane!" });
  }

  const sql1 = "UPDATE `rezerwacje` SET `nazwa`= ?,`pojemnosc`= ?,`rodzaj_id`= ?,`date`= ? WHERE id = ?";
  const values = [nazwa, Number(pojemnosc), Number(rodzaj), data, id];

  db.query(sql1, values, (err, result) => {
    if (err) {
      
      return res.status(500).json({ status: "error", message: err.message });
    }
  });


  const sqlGetRodzaj = "SELECT rodzaj_sala FROM sala WHERE id = ?";

  const now = new Date();
  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'
  ];

  const day = now.getUTCDate();
  const month = months[now.getUTCMonth()];
  const year = now.getUTCFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const result = `${day} ${month} ${year} ${hours}:${minutes}`;

    db.query(sqlGetRodzaj, [Number(rodzaj)], (errSelect, rows) => {
      if (errSelect) {
        console.error("Select Error:", errSelect);
        return res.status(500).json({ status: "error", message: errSelect.message });
      }

    const rodzaj_sala = rows.length > 0 ? rows[0].rodzaj_sala : rodzaj;

    const opis = `${imieUzytkownika} edytował rezerwacje dla ${rodzaj_sala}, ${result}`;
    const sql2 = "INSERT INTO `historia` (`opis`) VALUES (?)";

    db.query(sql2, [opis], (err2) => {
      if (err2) {
        console.error("SQL2 Error:", err2);
        return res.status(500).json({ status: "error", message: err2.message });
      }

      return res.json({ status: "success", message: "Added successfully" });
    });
  });
});

app.delete('/rezerwacje', (req, res) => {
  const id = req.query.select;
  const imieUzytkownika = "TestUser1";

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  const sqlGetRodzaj = `
    SELECT s.rodzaj_sala 
    FROM rezerwacje r
    LEFT JOIN sala s ON r.rodzaj_id = s.id
    WHERE r.id = ?
  `;

  const now = new Date();
  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'
  ];

  const day = now.getUTCDate();
  const month = months[now.getUTCMonth()];
  const year = now.getUTCFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const result = `${day} ${month} ${year} ${hours}:${minutes}`;

  db.query(sqlGetRodzaj, [Number(id)], (errSelect, rows) => {
    if (errSelect) {
      console.error("Select Error:", errSelect);
      return res.status(500).json({ status: "error", message: errSelect.message });
    }

    const rodzaj_sala = rows.length > 0 ? rows[0].rodzaj_sala : id;
    const opis = `${imieUzytkownika} usunął rezerwacje dla ${rodzaj_sala}, ${result}`;

    const sql2 = "INSERT INTO `historia` (`opis`) VALUES (?)";

    db.query(sql2, [opis], (err2) => {
      if (err2) {
        console.error("SQL2 Error:", err2);
        return res.status(500).json({ status: "error", message: err2.message });
      }

      const sql1 = "DELETE FROM rezerwacje WHERE id = ?";

      db.query(sql1, [Number(id)], (err) => {
        if (err) {
          console.error("Critical error MySQL:", err.message);
          return res.status(500).json({ status: "error", message: err.message });
        }

        return res.json({ status: "success", message: "Deleted successfully" });
      });
    });
  });
});

app.get('/salaEdit', (req, res) => {

  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  const sql = "SELECT * FROM `sala` WHERE id = ?";

  
  db.query(sql, [id], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/sala', (req, res) => {
  const { rodzaj_sala } = req.body;

  if (!rodzaj_sala) {
    return res.status(400).json({ status: "error", message: "Wszystkie pola są wymagane!" });
  }

  const sql = "INSERT INTO `sala` (rodzaj_sala) VALUES (?)";
  const values = [rodzaj_sala];

  db.query(sql, values, (err, result) => {
    if (err) {
      
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Added successfully" });
  });
});

app.put('/sala', (req, res) => {
  const { rodzaj_sala } = req.body;

  const id = req.query.select; 

  if (!id) {
    return res.status(400).json({ status: "error", message: "ID is missing in query parameters" });
  }

  if (!rodzaj_sala) {
    return res.status(400).json({ status: "error", message: "Wszystkie pola są wymagane!" });
  }

  const sql = "UPDATE `sala` SET `rodzaj_sala`= ? WHERE id = ?";
  const values = [rodzaj_sala, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Edited successfully" });
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

const crypto = require('crypto');

app.post('/register', (req, res) => {
  const { first_name, last_name, password, email } = req.body;

  if (!first_name || !last_name || !password || !email) {
    return res.status(400).json({ status: "error", message: "Wszystkie pola są wymagane!" });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const salt = "MyRandomSecretSalt99!";

  const sql = "INSERT INTO uzytkownicy (first_name, last_name, email, password, is_superuser, token) VALUES (?, ?, ?, SHA2(CONCAT(?, ?), 256), 0, ?)";

  const values = [first_name, last_name, email, password, salt, token];

  db.query(sql, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ status: "error", message: "Ten email jest już zarejestrowany!" });
      }
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.json({ status: "success", message: "Zarejestrowano!", token });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "Podaj email i hasło!" });
  }

  const salt = "MyRandomSecretSalt99!";
  const sql = "SELECT id, first_name, last_name, email, is_superuser FROM uzytkownicy WHERE email = ? AND password = SHA2(CONCAT(?, ?), 256)";

  db.query(sql, [email, password, salt], (err, rows) => {
    if (err) {
      console.error("MySQL Login Error:", err);
      return res.status(500).json({ status: "error", message: err.message });
    }

    if (rows.length === 0) {
      return res.status(401).json({ status: "error", message: "Nieprawidłowy email lub hasło!" });
    }

    const user = rows[0];
    const token = crypto.randomBytes(32).toString('hex');

    db.query("UPDATE uzytkownicy SET token = ? WHERE id = ?", [token, user.id], (err2) => {
      if (err2) {
        console.error("Token Update Error:", err2);
        return res.status(500).json({ status: "error", message: err2.message });
      }

      return res.json({ status: "success", token, user });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});