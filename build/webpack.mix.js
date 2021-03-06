const mix = require('laravel-mix');
const ComponentFactory = require('laravel-mix/src/components/ComponentFactory');

const { config: { browserSync, css, js }, paths } = require('./config');

const postCssPlugins = [
	require('@tailwindcss/postcss7-compat')('./build/tailwind.config.js'),
];

// Load JavaScript linter support
if (js.lint) {
	new ComponentFactory().install(require('./mix-modules/ESLintLoader'));
}

// Build
mix
	.options({
		autoprefixer: {
			options: css.autoprefixer,
			enabled: true,
		},
		cleanCss: css.cleanCss,
		processCssUrls: false,
		postCss: postCssPlugins,
		clearConsole: !(process.env.NO_CLI_FLUSH),
	})
	.js('resources/assets/js/app.js', 'compiled/js')
	.sass('resources/assets/scss/app.scss', 'compiled/css/app.css')
	.browserSync(browserSync)
	.setPublicPath(paths.dest);

// const combined = [];

// css.files.forEach((filename) => {
// 	const compiled = `compiled/temp/${filename.replace('scss', 'css')}`;
// 	mix.sass(`resources/assets/scss/${filename}`, compiled);
// 	combined.push(`${paths.dest}/${compiled}`);
// });

// mix.combine(combined, `${paths.dest}/compiled/css/app.css`);

if (mix.inProduction()) {
	mix.version();
} else {
	mix.sourceMaps(false, 'cheap-eval-source-map');
}
