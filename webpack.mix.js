const mix = require('laravel-mix');
const path = require('path');

require('laravel-mix-eslint');

const flags = {
	'__VUE_OPTIONS_API__': JSON.stringify(true),
	'__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
};

// Build
mix
	.alias({
		'@': path.join(__dirname, 'src'),
	})
	.webpackConfig((webpack) => {
		return {
			plugins: [
				new webpack.DefinePlugin(flags),
			],
		};
	})
	.options({
		autoprefixer: {
			options: {
				remove: false,
			},
		},
		processCssUrls: false,
	})
	.js('src/assets/js/app.js', 'compiled/js').vue()
	.eslint({
		extensions: ['js', 'vue'],
	})
	.postCss('src/assets/css/app.css', 'compiled/css/app.css', [
		require('postcss-import'),
		require('tailwindcss'),
		require('postcss-nested'),
	])
	.setPublicPath('_site');

if (mix.inProduction()) {
	mix.version();
} else {
	mix.sourceMaps(false, 'eval-cheap-source-map');
}
