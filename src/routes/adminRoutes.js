/*jslint node:true*/
'use strict';
var express = require('express'),
    adminRouter = express.Router(),
    mongodb = require('mongodb').MongoClient;
var books = [
    {
        title: '2 States',
        genre: 'Romantic',
        author: 'Chetan Bhagat',
        bookId: '',
        read: false
    },
    {
        title: 'Of Course I love you',
        genre: 'Comedy',
        author: 'Durjoy Datta',
        bookId: '',
        read: false
    },
    {
        title: 'If its not forever',
        genre: 'Romantic',
        author: 'Nikita Singh',
        bookId: '',
        read: false
    },
    {
        title: 'I too had a lovestory',
        genre: 'Romantic',
        author: 'Ravinder Singh',
        bookId: '',
        read: false
    },
    {
        title: 'Revolution 2020',
        genre: 'Sci-fi',
        author: 'Chetan Bhagat',
        bookId: '',
        read: false
    },
    {
        title: 'Can Love happen twice',
        genre: 'Tragedy',
        author: 'Ravinder Singh',
        bookId: '',
        read: false
    },
    {
        title: 'The God of small things',
        genre: 'Sci-fi',
        author: 'Ravinder Singh',
        bookId: '',
        read: false
    },
    {
        title: 'Angular JS',
        genre: 'Education',
        author: 'Rohan Passi',
        bookId: '',
        read: false
    }
];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
            //            res.send('Inserting Books');
        });
    return adminRouter;
};

module.exports = router;
