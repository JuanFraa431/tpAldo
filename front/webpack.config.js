const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/index.html'), 
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,  // Para archivos JS y JSX
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,  // Para archivos CSS
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],  // Resuelve JS y JSX sin especificar extensión
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        proxy: [
            {
                context: '/api',
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true,
            },
        ],
    },
};
