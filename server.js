// Loads the path module
// path module used to read directories and file paths
var path = require('path');

// Loads environment variables from the .env file into process.env
// Configures the dotenv module
require('dotenv').config();

var apiCredentials = require('./apiCredentials');

console.log(apiCredentials);