const mix = require('laravel-mix');

require('laravel-mix-eslint');

// Build
mix
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
		// require('postcss-nested'),
		require('tailwindcss'),
	])
	// .browserSync()
	.setPublicPath('_site');

if (mix.inProduction()) {
	mix.version();
} else {
	mix.sourceMaps(false, 'eval-cheap-source-map');
}
