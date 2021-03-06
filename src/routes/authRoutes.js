/*jslint node:true*/
'use strict';
var express = require('express'),
    authRouter = express.Router(),
    passport = require('passport'),
    mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users'),
                    user = {
                        username: req.body.username,
                        password: req.body.password
                    };
                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });
    return authRouter;
};


module.exports = router;
