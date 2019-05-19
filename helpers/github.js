const request = require('request');
const config = require('../config.js');
const database = require('../database/index.js');
let getReposByUsername = (username, cb) => {
    var url = 'https://api.github.com/users/' + username + '/repos'
    let options = {
        url: url,
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${config.TOKEN}`
        }
    };

    function callback(error, response, body) {
        if (JSON.parse(body).message) {
            cb(JSON.parse(body).message, null);
        } else if (!error && response.statusCode == 200) {
            try {
                var info = JSON.parse(body);
                database.saveRepos(info, cb);
            } catch (err) {
                cb(err, null);
            }
        }
    }
    request.get(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;




// code line 1
// code line 2
// javascript try catch