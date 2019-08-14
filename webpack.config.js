var path = require('path');
var webpack = require('webpack');

module.exports = function(fabricatorConfig) {

	var config = {
		entry: {
			'fabricator/scripts/f': fabricatorConfig.src.scripts.fabricator,
			'toolkit/scripts/toolkit': fabricatorConfig.src.scripts.toolkit
		},
		//debug: true,
		//devtool: "eval-source-map",
		output: {
			path: path.resolve(__dirname, fabricatorConfig.dest, 'assets'),
			filename: '[name].js'
		},

		resolve: {
		 	modulesDirectories: ['node_modules', 'bower_components'],
		 	alias: {
		       handlebars: 'handlebars/dist/handlebars.min.js',
          'picker': 'pickadate/lib/picker',
					modernizr$: path.resolve(__dirname, '.modernizrrc'),
		    }
	 	},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /(node_modules|prism\.js)/,
					loaders: ['babel-loader'],
					debug: false
				}
			],
			rules: [{
        test: /\.modernizrrc$/,
        loader: 'modernizr-loader!json-loader',
    	}]
		},
		'uglify-loader': {
		    mangle: false
		},

		plugins: [],
		cache: {}
	};

	if (fabricatorConfig.build) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				comments: false,
				extractComments: true,
				minimize: true,
				compress: {
					warnings: false,
					keep_fnames: false,
					sequences: true,
					dead_code: true,
					conditionals: true,
					booleans: true,
					unused: true,
					if_return: true,
					join_vars: true,
					drop_console: true
				 },
				 mangle: true
			})
		);
	}

	return config;

};
