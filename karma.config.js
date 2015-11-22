var webpackConfig = require('./webpack.config.js');

webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
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
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'webpack.tests.js'
        ]
    });
};
