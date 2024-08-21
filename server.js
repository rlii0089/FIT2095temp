let express = require('express');
let app = express();

app.listen(8080);

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/drivers', function(req, res) {
    
});

app.get('/drivers/new', function(req, res) {
    
});