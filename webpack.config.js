const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: {
        main: './src/layoutEntry.js',
    },
    output: {
        filename: "[name]bundle.js",
        path: path.resolve(path.join(__dirname, "./public/dist")),
        publicPath: './dist/'
    },
    module: {
        rules: [{
                test: /\.s?css/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|ttf)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "url-loader?limit=10000&mimetype=application/font-woff",
                    options: {
                        name: '[name].[ext]'
                    }
                }]

            }, {
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                ecma: 6,
                mangle: true
            },
            sourceMap: true
        })]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd() + '/public/',
            verbose: true,
            dry: false,
            watch: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}