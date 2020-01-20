const webpack = require('webpack');
const path = require('path');

module.exports = {
	mode: 'development',

    entry: {
	    forestGuide: path.resolve(__dirname, 'src/js/ForestGuide.js'),
    },
    output: {
        filename: 'forestGuide.js',
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
