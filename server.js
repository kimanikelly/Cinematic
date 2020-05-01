// Loads the path module
// path module used to read directories and file paths
var path = require('path');

// Loads environment variables from the .env file into process.env
// Configures the dotenv module
require('dotenv').config();

// Imports the Fandango credentials from apiCredentials.js 
var apiCredentials = require('./api-credentials');

// Stores the value of the Fandango apiKey
var apiKey = apiCredentials['apiKey'];

var axios = require('axios');

// Loads the Express module
// Express is a Node.js web application framework
// Will provide the HTTP server and HTTP routing
var express = require('express');

// Initializes Express and stores it in the variable app
var app = express();

// Defines the port the Express server will run on
var PORT = process.env.PORT || 3000;

// Imports the api-routes and given access to Express
require('./app/routing/api-routes')(app);

// Imports the html-routes and given access to Express
require('./app/routing/html-routes')(app);

axios.get('https://api.themoviedb.org/3/movie/550?api_key='+apiKey)
    .then(function (res) {
        console.log(res.data);
    })
    .catch(function (err) {
        console.log(err);
    })

// Starts the server running on the defined port
app.listen(PORT, function () {
    console.log("Express server running on port: " + PORT);
});




