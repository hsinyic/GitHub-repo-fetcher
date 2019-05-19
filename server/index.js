const express = require('express');
const bodyParser = require('body-parser');
const git = require('../helpers/github.js')
const db = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
// app.use(bodyParser.json());
// parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }))
// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/repos', function(req, res) {
    git.getReposByUsername(req.body.term, (err, data) => {
        res.header("Access-Control-Allow-Origin", "*");
        if (err) {
            // res.send(JSON.stringify(err));
            res.status(500).send();
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

app.get('/repos', function(req, res) {
    db.grab((err, data) => {
        res.header("Access-Control-Allow-Origin", "*");
        if (err) {
            res.send(JSON.stringify(err));
            // res.status(500)
        } else {
            res.send(JSON.stringify(data));
        }
    })
});


app.get('/users', function(req, res) {
    db.getUserRepos(req.body.user, (err, data) => {
        res.header("Access-Control-Allow-Origin", "*");
        if (err) {
            res.send(JSON.stringify(err));
            // res.status(500)
        } else {
            res.send(JSON.stringify(data));
        }
    })
});



let port = 1128;

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});