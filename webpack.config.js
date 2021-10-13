const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		},{
			test: /\.(eot|ttf|svg|woff|woff2)$/,
			use: {
				loader: 'file-loader'
			} 
		},{
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader', 
					options: {
						importLoaders: 2,
						modules: true
						// css 模块化 ，类似设置一个作用域,阻止css样式的全局污染
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}