const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageInfo = require('./package.json');
const version = packageInfo.version;//读取package.json里面的版本号


module.exports = merge(common, {
    mode: 'production',
    /**
     * @optimization
     * 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化，不过所有的优化还是可以手动配置和重写。
     */
    plugins: [
        /**
         * @BannerPlugin
         * 用于每个 chunk 文件头部添加 banner。
         */
        new webpack.BannerPlugin(
            `lzread@${version} for browser | https://github.com/lzread`
        ),
        /**
         * @CleanWebpackPlugin
         * 用于在下一次打包时清除之前打包的文件。
         */
        new CleanWebpackPlugin(),
    ],
    optimization: {
        /**
         * @minimize
         * 告知 webpack 使用 TerserPlugin 压缩 bundle。
         * production 模式下，这里默认是 true。
         */
        minimize: true
    },
});