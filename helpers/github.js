const request = require('request');
const config = require('../config.js');
const database = require('../database/index.js');
let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  var url = 'https://api.github.com/repositories?user:' + username + '+sort=stars' + '+max=50'
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  function callback(error, response, body) {
    if (error) {
      cb(error, null);
    } else if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      database.save(info, cb);
    }
  }
  request.get(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;