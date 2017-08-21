var HTMLWebpackPlugin=require('html-webpack-plugin');
var path = require('path');// ����·���� 
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';//// ������������Ҫ�õ��Ĵ��룬�������̨�￴���ľ��� 
var entry = PRODUCTION ? ['./src/index.js'] : ['./src/index.js',
    'webpack/hot/dev-server',//���������� hot 
    'webpack-dev-server/client?http://localhost:8080'//���webpack-dev-server�ͻ��� 
];
var plugins=PRODUCTION ? [ 
    new webpack.optimize.UglifyJsPlugin(), 
    new ExtractTextPlugin( 
    'style-[contenthash:10].css'//������������hashֵ 
    ), 
    new HTMLWebpackPlugin({// webpack ָ��Ŀ¼(package������)���ɾ�̬HTML�ļ� 
    template:'index-template.html' 
    }) 
    ] : [ 
    new webpack.HotModuleReplacementPlugin()];//ȫ�ֿ����������滻 �����CLI��������д
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
    entry: entry,//����ļ� 
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
        path:path.join(__dirname,'dist'),// ָ�����֮����ļ��� 
        publicPath: PRODUCTION ? '/' : '/dist/', 
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'// ָ�����Ϊһ���ļ� bundle.js 
    }
};