var path = require("path");

module.exports = {
    entry: './src/javascript/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: 'SimpleSwitch.min.js',
        library: 'SimpleSwitch'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|(dist)/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }
};
