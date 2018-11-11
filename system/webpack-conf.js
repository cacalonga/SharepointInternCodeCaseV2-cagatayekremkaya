const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("../webpack.config");

module.exports = function (app) {
    app.use(webpackDevMiddleware(webpack(webpackConfig),{
        serverSideRender: true,
        lazy:false,
        writeToDisk:true
    }));
};