const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const sampleData = require('../data.json');
const Promise = require('bluebird')


// ##########
// repository schema  
// ##########
let repoSchema = mongoose.Schema({
    stargazers_count: Number,
    owner_login: String,
    html_url: { type: String, unique: true },
    forks: Number,
    description: String,
    name: String
});
let Repo = mongoose.model('Repo', repoSchema);
let saveRepos = (data, cb) => {
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
    // ##########
    // grab a single user's repositories  
    // ##########
let getUserRepos = (usrname, cb) => {
    Repo.find({ owner_login: username }).exec().then((data) => {
        cb(null, data);
    }).catch(err => {
        cb(err, null);
    })
}


// ##########
// Use graph to store friend's schema 
// ##########
var friendSchema = mongoose.Schema;
var EdgeSchema = new friendSchema({
    id: String,
    source: {
        id: String,
    },
    target: {
        id: String,
    }
});
var VertexSchema = new friendSchema({
    id: String
});

// store all the users as Vertex 
// if there is a contributer, store an Edge between the two 
// whatif you have multiple edge? 

var Edge = mongoose.model('Edge', EdgeSchema);
var Vertex = mongoose.model('Vertex', VertexSchema);
var saveFriends = function(u, contributors) {
    // if u as a user already exist in the vertex
    // no: create a new Vertex  
    // yes: 
    // loop through all the contributors 
    // does contributors already exist? 
    // yes: create edge 
    // no: create vertex, and create edge  
}

var grabFriends = function(u) {
    // find all edges that are connected to u; 
}

module.exports.saveRepos = saveRepos;
module.exports.grab = grab;
module.exports.getUserRepos = getUserRepos;