const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					// loader: 'file-loader',
					loader:'url-loader',
					options:{
						// placeholder 占位符
						name: '[name]_[hash].[ext]',
						outputPath: 'images/',
						limit: 2048
						// 打包时，图片资源如果很小可以直接打包成base64形式放在打包文件里，如果资源较大建议直接放在外部文件夹中。
					}
				} 
			},{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader'
				} 
			},{
				test: /\.css$/,
				use: [
					'style-loader',
					 'css-loader',
					 'scss-loader'
					]
				// lader是一个自下而上，自左到右的执行顺序，例如scss文件，首先会将scss代码翻译成css,之后将css代码给到styleLoader,最后挂载到页面上
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}