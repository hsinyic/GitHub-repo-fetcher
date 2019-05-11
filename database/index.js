const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const sampleData = require('../data.json');

// console.log(sampleData[0]);

let repoSchema = mongoose.Schema({
  id: Number,
  owner_login: String,
  owner_id: Number,
  html_url: String,
  forks: Number,
  description: String
});



let Repo = mongoose.model('Repo', repoSchema);

let save = (arrObj) => {
  for (const k in arrObj) {
    let obj = arrObj[k];
    let puppy = new Repo({
      id: obj.id,
      owner_login: obj.owner.login,
      owner_id: obj.owner.owner_id,
      html_url: obj.html_url,
      forks: obj.fork,
      description: obj.description
    });
  
    puppy.save().then(() => {
      console.log(puppy);
    }).catch(e=>{
      console.log(e);
    })
  }

}
// example script to save the data to MongoDB
save(sampleData.slice(0,25));


module.exports.save = save;

Repo.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})





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













