/*jslint node:true*/
'use strict';
var express = require('express'),
    bookRouter = express.Router(),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectId;

var router = function (nav) {
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};


module.exports = router;
