const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const sampleData = require('../data.json');
const Promise = require('bluebird')

let repoSchema = mongoose.Schema({
  stargazers_count: Number,
  owner_login: String,
  html_url: { type: String, unique: true },
  forks: Number,
  description: String,
  name: String
});

let Repo = mongoose.model('Repo', repoSchema);
let write2Mongoose = (data, cb) => {
  var promiseSave = [];
  for (var k = 0; k < data.length; k++) {
    var obj = data[k];
    var newuser = new Repo({
      stargazers_count: obj.stargazers_count,
      owner_login: obj.owner.login,
      html_url: obj.html_url,
      forks: obj.fork,
      description: obj.description,
      name: obj.name
    });
    promiseSave.push(newuser.save());  
  }
  Promise.all(promiseSave)
  .then((data) => {
    cb(null, data);
  }).catch((err) => {
    cb(err, null);
  });
}

let grab = (cb) => {
  var top25repos = Repo.find({}).limit(50).sort({ stargazers_count: -1 }).exec();
  top25repos.then((data) => {
    cb(null, data);
  }).catch(err => {
    cb(err, null);
  })
}

module.exports.save = write2Mongoose;
module.exports.grab = grab;



