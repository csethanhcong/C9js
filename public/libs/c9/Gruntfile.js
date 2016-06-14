var webpack = require("webpack");
module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-webpack');
	webpack: {
	  C9: {
	    // webpack options
	    entry: "./entry.js",
	    output: {
	        path: __dirname,
	        filename: "C9.js",
	        // export itself to a global var
	        libraryTarget: "var",
	        // name of the global var: "Foo"
	        library: "C9"
	    },

	    stats: {
	        // Configure the console output
	        colors: false,
	        modules: true,
	        reasons: true
	    },
	    // stats: false disables the stats output

	    storeStatsTo: "xyz", // writes the status to a variable named xyz
	    // you may use it later in grunt i.e. <%= xyz.hash %>

	    progress: false, // Don't show progress
	    // Defaults to true

	    failOnError: false, // don't report error to grunt if webpack find errors
	    // Use this if webpack errors are tolerable and grunt should continue

	    watch: true, // use webpacks watcher
	    // You need to keep the grunt process alive

	    keepalive: true, // don't finish the grunt task
	    // Use this in combination with the watch option

	    inline: true,  // embed the webpack-dev-server runtime into the bundle
	    // Defaults to false

	    hot: true, // adds the HotModuleReplacementPlugin and switch the server to hot mode
	    // Use this in combination with the inline option

        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }]
        }
	  }
	}
};