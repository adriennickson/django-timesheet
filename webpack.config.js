const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./timesheet/static/timesheet/js/index.jsx"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                    importLoaders: 1,
                    modules: true,
                    },
                },
                ],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            'react-draft-wysiwyg': path.resolve(__dirname, './node_modules/react-draft-wysiwyg'),
        }
    },
    output: {
        path: path.resolve(__dirname, "./timesheet/static/timesheet/js"),
        filename: "bundle.js",
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: path.resolve(__dirname, "./timesheet/static/timesheet/js"),
        hot: true,
    },
};