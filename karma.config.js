var webpackConfig = require('./webpack.config.js');

webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS2'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs2-launcher',
            'karma-sourcemap-loader',
            require('karma-webpack')
        ],
        reporters: ['progress'],
        preprocessors: {
            'webpack.tests.js': [
                'webpack',
                'sourcemap'
            ]
        },
        singleRun: false,
        webpack: webpackConfig,
        webpackServer: {
            watchOptions: {
                aggregateTimeout: 500,
                poll: 1000
            },
            stats: {
                colors: true
            },
            noInfo: true
        },
        files: [
            'webpack.tests.js'
        ]
    });
};
