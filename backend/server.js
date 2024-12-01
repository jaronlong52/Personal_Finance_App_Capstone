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
    database: 'qwik_finance',
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

    db.query('INSERT INTO totals (username, income, payment, monthlyIncome) VALUES (?,?,?,?)', 
        [username, 0, 0, 0],
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

app.post('/preview/getTotals', (req, res) => {
    const username = req.body.username;
    db.query('SELECT * FROM totals WHERE username = ?', [username], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/preview/getSavings', (req, res) => {
    const username = req.body.username;
    db.query('SELECT * FROM savings WHERE username = ? AND percentage < 100 ORDER BY percentage DESC LIMIT 3', [username], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

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
    const total = req.body.total;

    db.query('INSERT INTO income (username, date, amount, comments) VALUES (?,?,?,?)', 
        [username, date, amount, comments],
        (err, result) => {
            console.log(err);
        }
    );

    db.query('UPDATE totals SET income = ? WHERE username = ?',
        [total, username],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/income/getTotal', (req, res) => {
    const username = req.body.username;
    db.query('SELECT * FROM totals WHERE username = ?', [username], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/payment/getRecords', (req, res) => {
    const username = req.body.username;
    const pastDate = req.body.pastDate;
    db.query('SELECT * FROM payment WHERE username = ? and date >= ?', [username, pastDate], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/payment/inputRecord', (req, res) => {

    const username = req.body.username;
    const date = req.body.date;
    const amount = req.body.amount;
    const comments = req.body.comments;
    const total = req.body.total;

    db.query('INSERT INTO payment (username, date, amount, comments) VALUES (?,?,?,?)', 
        [username, date, amount, comments],
        (err, result) => {
            console.log(err);
        }
    );

    db.query('UPDATE totals SET payment = ? WHERE username = ?',
    [total, username],
    (err, result) => {
        console.log(err);
    }
);
});

app.post('/budget/getBudget', (req, res) => {
    const username = req.body.username;
    db.query('SELECT * FROM budget WHERE username = ?', [username], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post ('/budget/setBudget', (req, res) => {
    const username = req.body.username;
    const label = req.body.labels;
    const amount = req.body.dataPoints;
    db.query('INSERT INTO budget (username, label, amount) VALUES (?,?,?)', 
        [username, label, amount],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post ('/budget/delBudget', (req, res) => {
    const username = req.body.username;
    const label = req.body.label;
    const dataPoint = req.body.dataPoint;
    db.query('DELETE FROM budget WHERE username = ? AND label = ? AND amount = ?', 
        [username, label, dataPoint], 
        (err, result) => {
            console.log(err);
        }
    );
 });

 app.post('/controlpie/getMonthlyIncome', (req, res) => {
    const username = req.body.username;
    db.query('SELECT monthlyIncome FROM totals WHERE username = ?', [username], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/savings/addGoal', (req, res) => {

    const username = req.body.username;
    const dateID = req.body.dateID;
    const title = req.body.title;
    const amount = req.body.amount;
    const progress = req.body.progress;
    const percentage = req.body.percentage;
    const state = 'in progress';

    db.query('INSERT INTO savings (username, dateID, title, amount, progress, percentage, state) VALUES (?,?,?,?,?,?,?)', 
        [username, dateID, title, amount, progress, percentage, state],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/savings/getGoals', (req, res) => {
    const username = req.body.username;
    const state = 'in progress';
    db.query('SELECT * FROM savings WHERE username = ? and state = ? ORDER BY percentage DESC', [username, state], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/savings/getCompleted', (req, res) => {
    const username = req.body.username;
    const state = 'completed';
    db.query('SELECT * FROM savings WHERE username = ? and state = ?', [username, state], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/savings/markCompleted', (req, res) => {
    const username = req.body.username;
    const id = req.body.dateID;
    const state = 'completed';
    db.query('UPDATE savings SET state = ? WHERE username = ? and dateID = ?', [state, username, id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/savings/deleteGoal', (req, res) => {
    const username = req.body.username;
    const id = req.body.dateID;
    db.query('DELETE FROM savings WHERE username = ? and dateID = ?', [username, id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/progress/addContribute', (req, res) => {
    const username = req.body.username;
    const progress = req.body.progress;
    const percent = req.body.percent;
    const id = req.body.dateID;
    db.query('UPDATE savings SET progress = ?, percentage = ? WHERE username = ? and dateID = ?', [progress, percent, username, id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/progress/reset', (req, res) => {
    const username = req.body.username;
    const id = req.body.dateID;
    const progress = 0;
    const percent = 0;
    db.query('UPDATE savings SET progress = ?, percentage = ? WHERE username = ? and dateID = ?', [progress, percent, username, id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/budgetPopup/update', (req, res) => {
    const username = req.body.username;
    const value = req.body.value;
    db.query('UPDATE totals SET monthlyIncome = ? WHERE username = ?', [value, username], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("listening");
})
