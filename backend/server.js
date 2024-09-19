const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'longjm3',
    password: '900905603',
    database: 'capstone'
})

// app.get('/', (re, res) => {
//     return res.json("something else");
// })

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    console.log(db);
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})