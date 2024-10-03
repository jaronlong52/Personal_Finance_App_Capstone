const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bottlekite90-',
    database: 'qwik_finance'
})

app.post('/checkRegister', (req, res) => {

    const username = req.body.username;

    db.query('SELECT * FROM users WHERE username = ?', 
        [username],
        (err, result) => {
            if (err) {
                res.send({err: err})
            }
            if (result.length > 0) {
                res.send('true');
            }
        }
    )
});

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
                res.send(result)
            } else {
                res.send({message: "Wrong combination"});
            }
        }
    );
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    console.log(db);
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/income', (req, res) => {
    const sql = "SELECT * FROM income";
    console.log(db);
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})
