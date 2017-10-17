/**
 * Created by zengwei on 2017/9/1.
 */

require('shelljs/global')

var webpack = require('webpack');
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var extractCSS = new ExtractTextPlugin('static/[name].[contenthash:10].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var assetsSubDirectory = 'static'



module.exports = {
    // eval-source-map
    // devtool: 'cheap-module-eval-source-map',//配置生成Source Maps，选择合适的选项
    devtool: 'inline-source-map',//配置生成Source Maps，选择合适的选项
    entry: {
        'app': __dirname + '/src/Main.js', //已多次提及的唯一入口文件
    },
    /*
     output: {
     path: path.resolve(__dirname, './webapp/static'),//打包后的文件存放的地方
     // publicPath: './static',
     filename: "js/bundle.js"//打包后输出文件的文件名
     },
     */
    output: {
        path: path.resolve(__dirname, './'),//打包后的文件存放的地方
        // publicPath: './static',
        filename: "bundle.js"//打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                //在配置文件里添加JSON loader
                test: /\.json$/,
                loader: "json-loader",
                options: {
                    name: path.posix.join(assetsSubDirectory, '/json/[name].[ext]')
                }
            },
            {
                test: /\.js$/,
                // include: path.resolve(__dirname, '../'),
                exclude: /node_modules/,
                loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: path.posix.join(assetsSubDirectory, '/img/[name].[ext]')
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                // loader: 'file-loader?limit=10000&name=static/fonts/[name].[hash:7].[ext]',
                options: {
                    limit: 10000,
                    name: path.posix.join(assetsSubDirectory, '/fonts/[name].[hash:7].[ext]'),
                    // name: '[name].[hash:7].[ext]',
                    publicPath: '../../',
                    // outputPath: '/font/'
                }
            }
        ]
    },
    plugins: [
        // new webpack.BannerPlugin("Copyright Flying Unicorns inc."),//在这个数组中new一个就可以了
    ],
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        // colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 9000,//实时刷新
        // 跨域联调配置
        proxy: {
            '/api/': {
                target: 'http://192.168.0.115:8080',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/api': '/'}
            }
        }
    }
}

if (process.env.NODE_ENV === 'production') {

    /* 拼接编译输出文件路径 */
    var assetsPath = path.join(path.resolve(__dirname, './webapp/'), assetsSubDirectory)
    /* 删除这个文件夹 （递归删除） */
    rm('-rf', assetsPath)
    /* 创建此文件夹 */
    mkdir('-p', assetsPath)
    /* 复制 static 文件夹到我们的编译输出目录 */
    cp('-R', 'static/*', assetsPath)


    // '#source-map'
    module.exports.devtool = false
    module.exports.output = {
        path: path.resolve(__dirname, './webapp/'),//打包后的文件存放的地方
        publicPath: './',
        // filename: "/js/bundle.js"// 打包后输出文件的文件名
        filename: path.posix.join(assetsSubDirectory, 'js/app.[hash:10].js')
    }


    let css_json = {
        test: /\.css$/,
        use:
        // ExtractTextPlugin.extract 在dev模式下不好使 extractCSS
            ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            // url: false,
                            sourceMap: false,
                            localIdentName: '[local]_[hash:base64:10]',
                            // importLoaders: 1,
                            minimize: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer]
                            }
                        }
                    }
                ],
                // publicPath: '../../'
            }),
    }
    //
    let stylus_json = {
        test: /\.styl$/,
        // include: path.resolve(__dirname, './src/assets/stylus'),
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                // 还有顺序之分，666
                {
                    loader: "css-loader",
                    options: {
                        modules: false,
                        // url: false,
                        sourceMap: false,
                        localIdentName: '[local]_[hash:base64:10]',
                        minimize: true,
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [autoprefixer]
                        }
                    }
                },
                {
                    loader: 'stylus-loader',
                    options: {
                        sourceMap: false,
                        minimize: true,
                    }
                }
            ]
        }),
    }

    module.exports.module.rules.push(css_json)
    module.exports.module.rules.push(stylus_json)


    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),

        new ExtractTextPlugin({
            filename: path.posix.join(assetsSubDirectory, '/css/[name].[contenthash:10].css'),//  生成css文件夹
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            filename: './index.html',
            inject: true,
            template: './index.html',
            //压缩HTML文件
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true, //删除空白符与换行符
                // 为了使GAEA能正确识别script, 保留引号
                // removeAttributeQuotes: true,
                minifyJS: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        })

    ])
} else if (process.env.NODE_ENV === 'development') {
    // /* 拼接编译输出文件路径 */
    // var assetsPath = path.join(path.resolve(__dirname), assetsSubDirectory)
    // console.log('assetsPath = ' + assetsPath)
    // /* 复制 static 文件夹到我们的编译输出目录 */
    // cp('-R', 'static/*', assetsPath)

    // 1.0的 loader: 'style-loader!stylus-loader?modules'//添加对样式表的处理

    let css_json = {
        test: /\.css$/,
        // include: path.resolve(__dirname, './src/assets/'),
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    modules: false,
                    sourceMap: true,
                    localIdentName: '[local]_[hash:base64:10]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [autoprefixer]
                    }
                }
            },
        ]
    }

    let stylus_json = {
        test: /\.styl$/,
        // include: path.resolve(__dirname, './src/assets/stylus'),
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    modules: false,
                    sourceMap: true,
                    localIdentName: '[local]_[hash:base64:10]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [autoprefixer]
                    }
                }
            },
            {
                loader: 'stylus-loader',
                options: {
                    sourceMap: false,
                }
            }
        ]
    }

    module.exports.module.rules.push(css_json)
    module.exports.module.rules.push(stylus_json)


    module.exports.output = {
        path: path.resolve(__dirname, './'),//打包后的文件存放的地方
        // publicPath: './',
        // filename: "/js/bundle.js"// 打包后输出文件的文件名
        filename: path.posix.join(assetsSubDirectory, 'js/bundle.js')
    }


    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),

        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: './index.html'
        }),

    ])
}
