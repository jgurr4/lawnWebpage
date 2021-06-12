//I have backup of this file in test/mysqlscript.js file so that I can revert to time when it worked if I have to.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 80
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "db",  //name of my container from docker-compose.yml line 3.
    user: "root",
    password: "super03",
    database: "customer"
})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// expose an endpoint "contact". If anyone goes to localhost:3000/api/contact this will return the data that exists in customer db. like so: [{"name":"rob"},{"name":"tracy"}]
// I must remove this code once I'm ready to deploy this app. Because it's a security risk.
//app.get('/api/contact', async (req, res) => {
//    console.log('GET request api/contact.')
//    let con;
//    try {
//        // establish a connection to MariaDB
//        con = await pool.getConnection();
//
//        // create a new query
//        const query = "select * from contact";
//
//        // execute the query and set the result to a new variable
//        const rows = await con.query(query);
//
//        // return the results
//        res.send(rows);
//    } catch (err) {
//        throw err;
//    } finally {
//        if (con) return con.release();
//    }
//});

app.post('/api/contact', async (req, res) => {
    console.log('post request received at api/contact.')
    let con;
    try {
        console.log(req.body);
        // establish a connection to MariaDB
        con = await pool.getConnection();

        const username = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const service = req.body.services;
        const address = req.body.address;
        const intervals = req.body.intervals;
        const message = req.body.message;

        await con.query('INSERT INTO contact VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())',
            [username, email, phone, service, address, intervals, message]);

        res.redirect('back');

        console.log('1 Record inserted.')
    } catch (err) {
        throw err;
    } finally {
        if (con) return con.release();
    }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
