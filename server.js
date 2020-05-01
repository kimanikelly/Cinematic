// Loads the path module
// path module used to read directories and file paths
var path = require('path');

// Loads environment variables from the .env file into process.env
// Configures the dotenv module
require('dotenv').config();

// Imports the Fandango credentials from apiCredentials.js 
var apiCredentials = require('./apiCredentials');

// Stores the value of the Fandango apiKey
var ap
// Stores the value of the Fandango apiSecret
var apiSecret = apiCredentials['apiSecret'];

