/*jslint node:true*/
'use strict';
var nav = [
    {
        Link: '/Books',
        Text: 'Book'
    },
    {
        Link: '/Authors',
        Text: 'Author'
    }
];
var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    bookRouter = require('./src/routes/bookRoutes')(nav),
    sql = require('mssql'),
    config = {
        user: '...',
        password: '...',
        server: '...',
        database: 'Books',
        options: {
            encrypt: true
        }
    };
    // config function details are not shown to prevent privacy

sql.connect(config, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Successful Connection to database');
    }
});

/*jslint nomen: true*/
app.use(express['static'](__dirname + '/public'));
/*jslint nomen: false*/

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from Render',
        nav: [
            {
                Link: '/Books',
                Text: 'Books'
            },
            {
                Link: '/Authors',
                Text: 'Authors'
            }
        ]
    });
});
app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('Running Server on ' + port);
});
