var express = require('express');

var app = express();

//System Init

require("./system/hbs-conf")(app);
require("./system/common-conf")(app);
require("./system/route-conf")(app);
require("./system/error-conf")(app);
require("./system/webpack-conf")(app);

module.exports = app;