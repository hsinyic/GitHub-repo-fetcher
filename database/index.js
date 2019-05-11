const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const sampleData = require('../data.json');
const Promise = require('bluebird')

let repoSchema = mongoose.Schema({
  stargazers_count: Number,
  owner_login: String,
  html_url: String,
  forks: Number,
  description: String
});

let Repo = mongoose.model('Repo', repoSchema);
let save = (data, cb) => {
  console.log('what')
  var promiseSave = [];
  for (var k = 0; k < data.length; k++) {
    var obj = data[k];
    var newuser = new Repo({
      stargazers_count: obj.stargazers_count,
      owner_login: obj.owner.login,
      html_url: obj.html_url,
      forks: obj.fork,
      description: obj.description
    });
    promiseSave.push(newuser.save());
  }
  console.log(promiseSave)
  Promise.all(promiseSave).then((err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  })
}

save(sampleData, (err, data) => {
  if (err) {
    // console.log(err);
  } else {
    // console.log('hiiii');
  }
})


module.exports.save = save;






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










