var HTMLWebpackPlugin=require('html-webpack-plugin');
var path = require('path');// 导入路径包 
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';//// 生产环境才需要用到的代码，比如控制台里看到的警告 
var entry = PRODUCTION ? ['./src/index.js'] : ['./src/index.js',
    'webpack/hot/dev-server',//开启热重载 hot 
    'webpack-dev-server/client?http://localhost:8080'//添加webpack-dev-server客户端 
];
var plugins=PRODUCTION ? [ 
    new webpack.optimize.UglifyJsPlugin(), 
    new ExtractTextPlugin( 
    'style-[contenthash:10].css'//根据内容生成hash值 
    ), 
    new HTMLWebpackPlugin({// webpack 指定目录(package内设置)生成静态HTML文件 
    template:'index-template.html' 
    }) 
    ] : [ 
    new webpack.HotModuleReplacementPlugin()];//全局开启代码热替换 如果是CLI这里则不用写
plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    }));
const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';
// const cssLoader = PRODUCTION ? ExtractTextPlugin.extract({
//     loader: 'css-loader?localIdentName=' + cssIdentifier
// }) : [
//         'style-loader',
//         'css-loader?localIdentName=' + cssIdentifier];
const cssLoader = PRODUCTION ? ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader?localIdentName=' + cssIdentifier]
}) : [
    'style-loader',
    'css-loader?localIdentName=' + cssIdentifier
];
module.exports = {
    externals:{ 
        'jquery':'jQuery' 
    }, 
    devtool: 'source-map',
    entry: entry,//入口文件 
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel-loader"],
                exclude: "/node_module/"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: ["url-loader?limit=20000&name=images/[hash:12].[ext]"],
                exclude: "/node_module/"
            },
            {
                test: /\.css$/,
                loaders: cssLoader,
                exclude: "/node_module/"
            }
        ]
    },
    output:{ 
        path:path.join(__dirname,'dist'),// 指定打包之后的文件夹 
        publicPath: PRODUCTION ? '/' : '/dist/', 
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'// 指定打包为一个文件 bundle.js 
    }
};