var webpack = require("webpack");
module.exports = {
    cache: true,
    entry: "./entry.js",
    // entry: {
    //     BarChart: './charts/C9.BarChart',
    //     DonutChart: './charts/C9.DonutChart',
    //     LineChart: './charts/C9.LineChart',
    //     PieChart: './charts/C9.PieChart',
    //     TimeLine: './charts/C9.TimeLine'
    // },
    output: {
        path: __dirname,
        filename: "C9.js",
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "C9"
    },
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
};