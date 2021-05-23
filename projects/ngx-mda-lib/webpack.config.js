const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: path.resolve(__dirname, './plugin/loader.js'),
                        options: {
                            transformers: [require('./plugin/listTransformer'), require('./plugin/codeTransformer')],
                        },
                    },
                    {
                        loader: 'raw-loader',
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'raw-loader',
                    },
                ],
            },
        ],
    },
};
