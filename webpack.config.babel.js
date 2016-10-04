import {join} from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'


const include = join(__dirname, 'src')

export default {
    entry: './src/index.js',
    output: {
        path: join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'C9'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.js?$/, loader: 'babel', include},
            {test: /\.css/, loader: ExtractTextPlugin.extract("css"), include},
        ]
    },
    plugins: [
        new ExtractTextPlugin("C9.min.css"),
        new webpack.optimize.UglifyJsPlugin({
            compressor: { warnings: false }
        })
    ]
}