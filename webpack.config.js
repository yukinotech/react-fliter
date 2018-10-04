const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:{
        bundle:'./src/main.js'
    },
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{rules:[
        {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
        }
    ]},
    plugins:[
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname, 'dist/index.html'),
            template:'./src/index.html',
            inject:false
        })
    ],
    mode: 'development'
}