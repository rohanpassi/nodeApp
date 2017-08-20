/*jslint node:true*/
'use strict';
var express = require('express'),
    bookRouter = express.Router(),
    sql = require('mssql');
var router = function(nav){
    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();
            request.query('select * from bookstable', function(err, data){
                // console.log(data.recordset.length);
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: data.recordset
                });
            });
        });

    bookRouter.route('/:id')
        .all(function(req, res, next){
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from bookstable where id = @id', function(err){
                ps.execute({id: req.params.id}, function(err, data){
                    // console.log(data.recordset[0]);
                    if(data.recordset.length === 0){
                        res.status(404).send('Not Found');
                    }
                    else{
                        req.book = data.recordset[0];
                        next();
                    }
                });
            });
        })
        .get(function (req, res) {
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            });
        });    
    
    return bookRouter;
};


module.exports = router;