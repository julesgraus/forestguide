const webpack = require('webpack');
const path = require('path');

module.exports = {
	mode: 'development',

    entry: {
	    forestguide: './src/js/forestguide.js',
    },
    output: {
        filename: 'forestguide.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ],
    }
};
