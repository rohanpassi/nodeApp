/*jslint node:true*/
'use strict';
var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

/*jslint nomen: true*/
app.use(express['static'](__dirname + '/public'));
/*jslint nomen: false*/

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index', {list: ['a', 'b']});
});
app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('Running Server on ' + port);
});
