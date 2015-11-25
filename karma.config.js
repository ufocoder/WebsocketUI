var _ = require('lodash'),
    path = require('path'),
    webpackConfig = require('./webpack.config.js');

_.merge(webpackConfig, {
    devtool: 'inline-source-map',
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)?$/,
          include: path.resolve('src/'),
          loader: 'babel-istanbul-instrumenter'
        }
      ]
    }
});

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-coveralls',
            'karma-coverage',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            require('karma-webpack')
        ],
        reporters: ['progress', 'coverage', 'coveralls'],
        coverageReporter: {
          type : 'lcov',
          dir: 'coverage/'
        },
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
