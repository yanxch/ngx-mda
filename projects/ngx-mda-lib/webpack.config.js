const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: path.resolve(__dirname, './loader/ngx-mda-loader.js'),
                        options: {
                            transformers: [
                                require('./transformers/listTransformer'),
                                require('./transformers/codeTransformer'),
                            ],
                            handlers: {
                                angularListItem: require('./handlers/angularListItem').angularListItem,
                            },
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
