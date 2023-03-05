const path = require('path');

module.exports = {
    entry: './demo/modules/web_main.mjs',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'model.dist.js',
        // library: 'model',
        // libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.mjs']
    },
    target: ['web', 'es5']
};