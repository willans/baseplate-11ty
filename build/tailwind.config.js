const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const range = require('lodash/range');
const twColors = require('@tailwindcss/postcss7-compat/colors');
const variables = require('../resources/assets/variables.json');

// converters and calculators
const relative = (px, unit = 'rem', base = variables['browser-default-font-size']) => `${px / base}${unit}`;
const letterSpacing = value => `${value / 1000}em`;
const ratio = (x, y) => `${y / x * 100}%`;

// values
const easing = mapValues(variables.easing, val => `cubic-bezier(${val[0]}, ${val[1]}, ${val[2]}, ${val[3]})`);

const mqUnits = variables['em-media-queries'] ? 'em' : 'rem';
const screens = mapValues(variables.breakpoints, px => relative(px, mqUnits));

const c = variables.columns;
const widths = mapKeys(mapValues(range(0, c), (v) => ratio(c, v + 1)), (v, k) => `${parseInt(k, 10) + 1}/${c}`);

const z = variables['z-indexes'];
const zIndex = z.reduce((v, name, i) => ({ ...v, [name]: z.length - i }), {});

const gridColumn = mapKeys(mapValues(range(13, c + 1), v => `span ${v} / span ${v}`), (v, k) => `span-${parseInt(k, 10) + 13}`);
const gridColumnStart = mapKeys(mapValues(range(13, c + 1), v => String(v)), v => v);

// tailwind settings
module.exports = {
	purge: [
		'./resources/assets/js/**/*.vue',
		'./resources/views/**/*.*',
	],
	theme: {
		fontFamily: {
			body: ['custom-body', 'Helvetica', 'sans-serif'],
			heading: ['custom-heading', 'Georgia', 'serif'],
			system: ['system-ui', 'sans-serif'],
		},
		fontSize: {
			xs: relative(12),
			sm: relative(14),
			base: relative(16),
			lg: relative(18),
			xl: relative(20),
			'2xl': relative(22),
			'3xl': relative(26),
			'4xl': relative(30),
			'5xl': relative(36),
			'6xl': relative(44),
			full: '100%',
		},
		fontWeight: {
			normal: 400,
			bold: 700,
		},
		letterSpacing: {
			normal: 0,
			wide: letterSpacing(50),
		},
		lineHeight: {
			none: 1,
			tight: 1.1,
			snug: 1.25,
			normal: 1.5,
			relaxed: 1.75,
			loose: 2,
		},
		screens,
		transitionTimingFunction: easing,
		zIndex: {
			...zIndex,
			0: 0,
			'-1': -1,
		},
		extend: {
			boxShadow: theme => ({
				focus: `0 0 5px ${theme('colors.blue.500')}`,
			}),
			colors: {
				inherit: 'inherit',
				gray: false,
				grey: twColors.warmGray,
			},
			gridColumn,
			gridColumnStart,
			gridTemplateColumns: {
				24: 'repeat(24, minmax(0, 1fr))',
			},
			inset: (theme, { negative }) => ({
				'1/2': '50%',
				...widths,
				...(negative(widths)),
			}),
			maxWidth: {
				container: relative(1400),
				copy: '35em',
			},
			padding: {
				full: '100%',
				'9/16': ratio(16, 9),
				'3/4': ratio(4, 3),
				'4/3': ratio(3, 4),
			},
			spacing: {
				em: '1em',
				'1/2em': '.5em',
			},
			width: {
				...widths,
			},
		},
	},
	variants: {},
	corePlugins: {
		container: false,
	},
};
