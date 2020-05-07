// Loads environment variables from the .env file into process.env
// Configures the dotenv module
require('dotenv').config();

// Loads the Express module
// Express is a Node.js web application framework
// Will provide the HTTP server and HTTP routing
var express = require('express');

// Initializes Express and stores it in the variable app
var app = express();

// Defines the port the Express server will run on
var PORT = process.env.PORT || 5000;

// Imports the api-routes and given access to Express
require('./app/routing/api-routes')(app);

// Imports the html-routes and given access to Express
require('./app/routing/html-routes')(app);

// Allows express to access/serve the static files
app.use(express.static(__dirname + '/app/public'));


// Starts the server running on the defined port
app.listen(PORT, function () {
    console.log("Express server running on port: " + PORT);
});




