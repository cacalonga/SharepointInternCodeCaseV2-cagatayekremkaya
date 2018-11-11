var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var serveStatic = require('serve-static');

module.exports = function (app) {

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    // app.use(express.static(path.join(__dirname, 'public')));

    app.use(serveStatic(path.join(__dirname, './../public'), {
        maxAge: '1d',
        etag: true
    }));

}