/*jslint node:true*/
'use strict';
var express = require('express'),
    bookRouter = express.Router();
var books = [];

bookRouter.route('/')
    .get(function (req, res) {
        res.render('books', {
            title: 'Books',
            nav: [
                {
                    Link: '/Books',
                    Text: 'Books'
                },
                {
                    Link: '/Authors',
                    Text: 'Authors'
                }
            ],
            books: books
        });
    });

bookRouter.route('/single')
    .get(function (req, res) {
        res.send('Hello Single Book');
    });
module.exports = bookRouter;