const mix = require('laravel-mix');
const ComponentFactory = require('laravel-mix/src/components/ComponentFactory');

const { config: { browserSync, css, js }, paths } = require('./config');

const postCssPlugins = [
	require('tailwindcss')('./build/tailwind.config.js'),
];

// PurgeCSS
if (mix.inProduction()) {
	postCssPlugins.push(require('@fullhuman/postcss-purgecss')({
		content: [
			'./resources/**/*.vue',
		],
		// https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475
		defaultExtractor: content => content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [],
		whitelist: css.purgeCssWhitelist,
		whitelistPatterns: css.purgeCssWhitelistPatterns.map(element => new RegExp(element)),
	}));
}

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
	.js('resources/assets/js/app.js', 'js')
	.sass('resources/assets/scss/app.scss', 'css/app.css')
	.browserSync(browserSync)
	.setPublicPath(paths.dest);

if (mix.inProduction()) {
	mix.version();
} else {
	mix.sourceMaps(false, 'cheap-eval-source-map');
}
