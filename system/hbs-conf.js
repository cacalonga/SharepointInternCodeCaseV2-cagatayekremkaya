var expressHbs = require('express-handlebars');
var hbsHelpers = require('handlebars-helpers')();
var path = require('path');
var handlebars = require('hbs');

module.exports = function (app) {

  hbsHelpers.section = function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    };
  
  var hbs = expressHbs.create({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.resolve(__dirname, './../views/layout'),
    partialsDir: path.resolve(__dirname, './../views/layout/partials'),
    helpers:hbsHelpers
    }
  );
  
  app.engine('.hbs', hbs.engine);
  app.set('views', path.join(__dirname, './../views'));
  app.set('view engine', '.hbs');
}