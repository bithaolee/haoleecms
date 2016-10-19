var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'public', 'source');

// 获取多页面的每个入口文件，用于配置中的entry
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
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
    cache: true,
    devtool: "source-map",
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "public/dist/js/"), // 设置输出的文件路径
        publicPath: "dist/js/", // 设置资源的访问路径
        filename: "[name].js", // 设置输出文件名，filename可以有多种配置，比如main.js，[id].js，[name].js，[hash].js等
        chunkFilename: "[chunkhash].js"
    },
    module: {
        noParse: ['/react/react.min.js'], // 外部加载的文件不需要再次通过webpack loader解析
        // test: 匹配规则; loader: 你要载入的loader; exclude: 你在执行规则是想忽略的目录
        loader: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // 使用 ! 来链接多个loader
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}, // 内联小于8k的base64图片，其他的直接使用URL
            { test: /\.coffee$/, loader: 'coffee-loader' },
            { test: /\.js$/, loader: 'bebel-loader' }
        ]
    },
    resolve: {
        root: path.resolve(process.cwd(), 'public', 'source'),
        // 你现在可以使用 ``require('file')`` 来代替 ``require('file.coffee')``
        extensions: ['.js', '.css', '.json', '.coffee', '.jsx'],
        alias: {
            jquery: srcDir + "/js/lib/jquery.min.js",
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui"
        }
    },
    externals: {}, // 定义外部引用的资源，可以直接使用
    plugins: [
        new CommonsChunkPlugin('common.js'),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
