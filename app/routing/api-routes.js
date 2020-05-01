// Imports TMDB credentials from apiCredentials.js 
var apiCredentials = require('../../api-credentials');

// Stores the value of TMDB apiKey
var apiKey = apiCredentials['apiKey'];

module.exports = function (app) {

    // HTTP Post request to send the apiKey to the front end
    app.post('/token', function (req, res) {
        res.send(apiKey);
    })
}