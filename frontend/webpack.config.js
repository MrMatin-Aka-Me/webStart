const path = require("path");
const webpack = require('webpack')
const { ProvidePlugin } = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src')

module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
    entry: {
        'app': './src/index',
    },
    output: {
        path: path.resolve('../static/assets/bundles_react/'),
        filename: "[name]-[fullhash].js",
        publicPath: "/static/assets/bundles_react/",

    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            // template: path.join(__dirname, 'public/react.html')
        }),
        new ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    })],
    // модули из которых собираем проект
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10*1024
                    }
                }
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(srcPath, 'components'),
            store: path.join(srcPath, 'store'),
            img: path.join(srcPath, 'images'),
            utils:path.join(srcPath, 'utils'),
        },
    }
}