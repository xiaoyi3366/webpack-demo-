var path = require('path');// ����·���� 
var webpack = require('webpack');
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';
var entry = PRODUCTION
    ? ['./src/index.js'] : [
        './src/index.js',
        'webpack/hot/dev-server',//���������� hot 
        'webpack-dev-server/client?http://localhost:8080'//���webpack-dev-server�ͻ��� 
    ];

var plugins = PRODUCTION ? [] : [new webpack.HotModuleReplacementPlugin()//ȫ�ֿ����������滻 �����CLI��������д 
];
module.exports = {
    entry: entry,//����ļ� 
    plugins: plugins,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel-loader"],
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: ["file-loader"],
                exclude: "/node_module/"
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),// ָ�����֮����ļ��� 
        publicPath: '/dist/',// ָ����Դ�ļ����õ�Ŀ¼ 
        filename: 'bundle.js'// ָ�����Ϊһ���ļ� bundle.js 
        //filename: '[name].js' // ���Դ��Ϊ����ļ� 
       
    }
};
