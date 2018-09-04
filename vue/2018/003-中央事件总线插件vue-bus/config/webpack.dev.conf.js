const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

let config = {
    // context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: '[name].[hash].js', // 将出口文件重命名 为了解决 浏览器缓存问题，提升用户体验
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'], // webpack可以解析不带后缀名的.js .vue .json文件
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // vue/dist/vue.common.js 运行时构建和独立构建
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'vue-style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: path.resolve(__dirname, '../index.html'),
            inject: true
        })
    ]
};

module.exports = config;