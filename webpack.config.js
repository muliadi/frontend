var webpack = require('webpack');

module.exports = {
    entry: "./app/components/Main.js",
    output: {
        filename: "../sapakim_be/static/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new webpack.IgnorePlugin(/react/),
        // new webpack.IgnorePlugin(/react-dom/),
    ]
};
