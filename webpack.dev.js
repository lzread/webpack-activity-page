const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 9000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        /**
        * @HtmlWebpackPlugin
        * 用于HTML文件的创建，以便为你的webpack包提供服务。
        * 这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 
        * 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。
        */
        new HtmlWebpackPlugin({
            template: './index.html', // 模板来源html文件    
        })
    ]
});