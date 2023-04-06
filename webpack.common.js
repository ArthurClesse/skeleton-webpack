const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: './source/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                importer: globImporter()
                            }
                        }
                    }
                ]
            },
            {
                test: /\.twig$/,
                exclude: /node_modules/,
                type: 'asset/source',
                use: [
                    {
                        loader: 'twig-html-loader',
                        options: {
                            data: {},
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            'gsap': path.resolve(__dirname, './node_modules/gsap'),
            'ScrollTrigger': path.resolve(__dirname, './node_modules/gsap/ScrollTrigger'),
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/index.twig'
        }),
        new CopyPlugin({
            patterns: [
                { from: "source/assets", to: "assets" }
            ],
        }),
    ]
}