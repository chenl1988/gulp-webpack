/*var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");*/
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
/*var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;*/

var srcDir = path.resolve(process.cwd(), 'src');
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log("js files:"+JSON.stringify(files));
    return files;
}
module.exports = {
    cache: true,
    devtool: "#source-map",
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: "dist/js/",
        filename: "[name].js",
    },
   module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
        ]
    },
    resolve: {
        extensions: ['.js', '.less', '.css', '.png', '.jpg'],
        alias: {
            jquery: srcDir + "/js/lib/jquery-3.1.0.min.js",
        }
    },
    plugins: [

        /*new CommonsChunkPlugin('common.js'),

        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]
};