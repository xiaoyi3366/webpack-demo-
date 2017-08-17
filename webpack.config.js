var path = require('path');// 导入路径包 
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';//// 生产环境才需要用到的代码，比如控制台里看到的警告 
var entry = PRODUCTION ? ['./src/index.js'] : ['./src/index.js',
    'webpack/hot/dev-server',//开启热重载 hot 
    'webpack-dev-server/client?http://localhost:8080'//添加webpack-dev-server客户端 
];
var plugins = PRODUCTION ? [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtrackTextPlugin('style.css')
] : [
        new webpack.HotModuleReplacementPlugin()//全局开启代码热替换 如果是CLI这里则不用写 
    ];
plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    }));
const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';
const cssLoader = PRODUCTION ? ExtrackTextPlugin.extract({
    loader: 'css-loader?localIdentName=' + cssIdentifier
}) : [
        'style-loader',
        'css-loader?localIdentName=' + cssIdentifier];
module.exports = {
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
    output: {
        path: path.join(__dirname, 'dist'),// 指定打包之后的文件夹 
        publicPath: '/dist/',// 指定资源文件引用的目录 
        filename: 'bundle.js'// 指定打包为一个文件 bundle.js 
    }
};