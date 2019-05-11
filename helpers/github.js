const request = require('request');
const config = require('../config.js');
const database = require('../database/index.js');
let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  var url = 'https://api.github.com/users/' + username + '/repos'
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  function callback(error, response, body) {
    // console.log('error = ', JSON.parse(body).message); // if valid username, error === null 
    if (JSON.parse(body).message) {
      cb(JSON.parse(body).message, null);
    } else if (!error && response.statusCode == 200) {
      return new Promise((resolve, reject)=>{
        resolve(JSON.parse(body));
      })
      .then(info => {
        database.save(info, cb);})
      .catch(err=> {cb(err, null)})
    }
  }
  request.get(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;




// code line 1
// code line 2
// javascript try catch