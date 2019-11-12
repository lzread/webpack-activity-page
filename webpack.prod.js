const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    /**
     * @optimization
     * 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化，不过所有的优化还是可以手动配置和重写。
     */
    plugins: [
        /**
         * @CleanWebpackPlugin
         * 用于在下一次打包时清除之前打包的文件。
         */
        new CleanWebpackPlugin(),
       
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin()
        ],

    },
});