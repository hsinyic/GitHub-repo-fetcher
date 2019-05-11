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
let save = (data, cb) => {
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
  Promise.all(promiseSave).then((data) => {
    cb(null, data);
  }).catch((err) => {
    cb(err, null);
  });
}

let grab = (cb) => {
  var top25repos = Repo.find({}).limit(50).sort({ stargazers_count: -1 });
  var top25reposAsync = top25repos.exec();
  top25reposAsync.then((data) => {
    console.log('got data')
    console.log(data);
    cb(null, data);
  }).catch(err => {
    cb(err, null);
  })
}

module.exports.save = save;
module.exports.grab = grab;





// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
// });

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log(kitty.name));

// const kitty2 = new Cat({ name: 'kitty2' });
// kitty2.save().then(() => console.log(kitty2.name));

// const kitty3 = new Cat({ name: 'kitty3' });
// kitty3.save().then(() => console.log(kitty3.name));



// Cat.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })



// Repo.find(function (err, kittens) {
//   //   if (err) return console.error(err);
//   //   console.log(kittens);
//   // })










