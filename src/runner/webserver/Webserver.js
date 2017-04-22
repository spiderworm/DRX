
import path from 'path';
import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default class Webserver {
	constructor() {
		const webpackConfig = [

			{
				entry: {
					app: [
						"./src/runner/drxRunnerClient.js",
						"webpack-dev-server/client?http://localhost:8080/",
						"webpack/hot/dev-server"
					]
				},
				output: {
					path: path.resolve(__dirname, "temp/webserver/8080"),
					publicPath: "/",
					filename: "index.js"
				},
				plugins: [
					new CopyWebpackPlugin(
						[
							{
								from: "src/runner/webserver/runner.html",
								to: "index.html"
							}
						]
					),
					new Webpack.HotModuleReplacementPlugin()
				],
				module: {
					loaders: [
						{
							test: /.js$/,
							loaders: [
								'babel-loader?presets[]=es2015',
								require.resolve('./macro-loader.js') + '?' +
									'TARGET_PATH=' + encodeURIComponent(path.resolve('./demos/cube/CubeEntity.js'))
							],
							exclude: /node_modules/
						},
						{
							test: /\.json$/,
							use: 'json-loader'
						}
					]
				},
				devtool: 'eval-source-map',
				node: {}
			}
		];

		const compiler = Webpack(webpackConfig);
		const server = new WebpackDevServer(
			compiler,
			{
				host: 'localhost',
				port: 8080,
				contentBase: 'temp/webserver/8080/',
				hot: true,
				stats: {
					colors: true
				}
			}
		);

		server.listen(8080, "127.0.0.1", function() {
			console.log("Starting server on http://localhost:8080");
		});

	}
}
