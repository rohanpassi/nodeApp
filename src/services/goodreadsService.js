/*jslint node:true*/
'use strict';
var http = require('http'),
    xml2js = require('xml2js'),
    parser = xml2js.Parser({
        explicitArray: false
    });
var goodreadsService = function () {
    var getBookById = function (id, cb) {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=XXXXXXXX'
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                console.log(str);
                parser.parseString(str, function (err, result) {
                    cb(null, result.GoodreadsResponse.book);
                });
            });
        };

        http.request(options, callback).end();
    };
    return {
        getBookById: getBookById
    };
};
module.exports = goodreadsService;
