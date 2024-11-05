const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qwikfindb'
})

app.post('/register', (req, res) => {

    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    db.query('INSERT INTO users (username, name, password) VALUES (?,?,?)', 
        [username, name, password],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE username = ? AND password = ?', 
        [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err})
            }
            if (result.length > 0) {
                res.send({message: "Valid"})
            } else {
                res.send({message: "Invalid"});
            }
        }
    );
});

app.get('/users', (req, res) => {
    const sql = "SELECT username FROM users";
    console.log(db);
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/income/getRecords', (req, res) => {
    const username = req.body.username;
    const pastDate = req.body.pastDate;
    db.query('SELECT * FROM income WHERE username = ? and date >= ?', [username, pastDate], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/income/inputRecord', (req, res) => {

    const username = req.body.username;
    const date = req.body.date;
    const amount = req.body.amount;
    const comments = req.body.comments;

    db.query('INSERT INTO income (username, date, amount, comments) VALUES (?,?,?,?)', 
        [username, date, amount, comments],
        (err, result) => {
            console.log(err);
        }
    );
});

app.listen(8081, () => {
    console.log("listening");
})
