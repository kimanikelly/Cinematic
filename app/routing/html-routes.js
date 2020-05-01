// Loads the path module
// path module used to read directories and file paths
var path = require('path');

module.exports = function (app) {

    // GET route used to display index.html page
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });
}