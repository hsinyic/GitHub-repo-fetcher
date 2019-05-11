const express = require('express');
const bodyParser = require('body-parser');
const git = require('../helpers/github.js')
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



app.post('/repos', function (req, res) {
  git.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      res.sendStatus(500).send(err.toString());
    } else {
      res.send(data);
    }
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

