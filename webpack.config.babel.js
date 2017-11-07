import {join} from 'path'

const include = join(__dirname, 'src');

export default {
    entry: './src/sensorplug',
    output: {
        path: join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'sensorplug'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', include},
            {test: /\.json$/, 'loader': 'json', include}
        ]
    }
}