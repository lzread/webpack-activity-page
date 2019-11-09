const path = require('path');
const webpack = require('webpack');

// 导入非 webpack 自带默认插件。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const packageInfo = require('./package.json');
const version = packageInfo.version;//读取package.json里面的版本号

module.exports = {
    /**
     * @entry 
     * 起点或是应用程序的起点入口。
     * 从这个起点开始，应用程序启动执行。
     * 如果传递一个数组，那么数组的每一项都会执行。
     * 简单规则：每个 HTML 页面都有一个入口起点。
     * 单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。
     */
    entry: {
        index: './src/index.js',
    },
    /**
     * @output
     * 位于对象最顶级键(key)，包括了一组选项，指示 webpack 如何去输出、
     * 以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。
     */
    output: {
        /**
         * @path 
         * output 目录对应一个绝对路径。
         */
        path: path.resolve(__dirname, 'dist'),
        /**
         * @filename 
         * 此选项决定了每个输出 bundle 的名称。
         * 这些 bundle 将写入到 output.path 选项指定的目录下
         * [name]   模块名称。
         * [hash]   模块标识符(module identifier)的 hash。
         */
        filename: 'js/[name].[hash].js',
        /**
         * @library 
         * 模块命名空间用于 libraryTarget: 'umd'。
         * 在构建成为一个 library 之后，通常也是 library 名称，否则为空。
         */
        library: 'MyLibrary',
        /**
         * @libraryTarget 
         * 此选项与分配给 output.library 的值一同使用。
         */
        libraryTarget: "umd",

    },
    /**
     * module
     * 这些选项决定了如何处理项目中的不同类型的模块。
     */
    module: {
        /**
         * @rules
         * 创建模块时，匹配请求的规则数组。
         * 这些规则能够修改模块的创建方式。
         * 这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
         */
        rules: [
            {
                /**
                 * @test
                 * 匹配特定条件。一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。
                 */
                test: /\.(s[ac]ss|css)$/,
                /**
                 * @use
                 * 应用于模块的 UseEntries 数组。
                 */
                use: [
                    MiniCssExtractPlugin.loader,    //打包的时候依靠配置的这个 loader 生成 css 文件。
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    /**
     * @optimization
     * 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化，不过所有的优化还是可以手动配置和重写。
     */
    optimization: {
        /**
         * @minimize
         * 告知 webpack 使用 TerserPlugin 压缩 bundle。
         * production 模式下，这里默认是 true。
         */
        minimize: false
    },
    /**
     * @plugins 
     * 用于以各种方式自定义 webpack 构建过程。
     */
    plugins: [
        /**
         * @MiniCssExtractPlugin
         * 用于css样式从js文件中提取到单独的css文件中。
         */
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
        }),
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
        /**
         * @HtmlWebpackPlugin
         * 用于HTML文件的创建，以便为你的webpack包提供服务。
         * 这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 
         * 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。
         */
        new HtmlWebpackPlugin({
            template: './index.html', // 模板来源html文件    
        })
    ],
    /**
     * @devServer
     * 能够用于快速开发应用程序
     */
    devServer: {
        /**
         * @contentBase
         * 告诉服务器从哪个目录中提供内容。
         * 只有在你想要提供静态文件时才需要。
         */
        contentBase: path.join(__dirname, 'dist'),
        /**
         * @compress
         * 一切服务都启用 gzip 压缩。
         */
        compress: true,
        /**
         * @port
         * 指定要监听请求的端口号,默认为8080。
         */
        port: 9000
    },
    /**
     * @devtool 
     * 此选项控制是否生成，以及如何生成 source map。
     * source-map (原始源代码) 增强调试过程。
     * 强烈建议配置，否则报错很难定位。
     */
    devtool: "source-map",


};