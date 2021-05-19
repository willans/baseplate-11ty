const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const range = require('lodash/range');
const variables = require('./src/assets/variables.json');

// converters and calculators
const letterSpacing = value => `${value / 1000}em`;
const relative = (px, unit = 'rem', base = variables['browser-default-font-size']) => `${px / base}${unit}`;
const ratio = (x, y) => `${y / x * 100}%`;

// values
const transitionTimingFunction = mapValues(variables.easing, val => `cubic-bezier(${val[0]}, ${val[1]}, ${val[2]}, ${val[3]})`);

const screens = mapValues(variables.breakpoints, px => relative(px, 'em'));

const c = variables.columns;
const width = mapKeys(mapValues(range(0, c), (v) => ratio(c, v + 1)), (v, k) => `${parseInt(k, 10) + 1}/${c}`);

// tailwind settings
module.exports = {
	mode: 'jit',
	purge: {
		content: [
			'./src/assets/purge-safelist.txt',
			'./src/app/**/*.liquid',
		],
		// options: {
		// 	// see purge-safelist.txt
		// 	safelist: [
		// 		'example',
		// 		/-(leave|enter|appear)(|-(to|from|active))$/,
		// 	],
		// },
	},
	theme: {
		screens,
		container: {
			center: true,
			padding: {
				DEFAULT: relative(15),
				sm: relative(20),
				md: relative(30),
				lg: relative(40),
				xl: relative(50),
				'2xl': relative(60),
			},
		},
		fontFamily: {
			body: ['ff-custom-body', 'Helvetica', 'sans-serif'],
			heading: ['ff-custom-heading', 'Georgia', 'serif'],
			system: ['system-ui', 'sans-serif'],
		},
		fontSize: (theme) => ({
			full: '100%',
			xs: [relative(12), theme('lineHeight.normal')],
			sm: [relative(14), theme('lineHeight.normal')],
			base: [relative(16), theme('lineHeight.normal')],
			lg: [relative(18), theme('lineHeight.normal')],
			xl: [relative(20), theme('lineHeight.normal')],
			'2xl': [relative(24), theme('lineHeight.snug')],
			'3xl': [relative(30), theme('lineHeight.snug')],
			'4xl': [relative(36), theme('lineHeight.tight')],
			'5xl': [relative(48), theme('lineHeight.extra-tight')],
			'6xl': [relative(60), theme('lineHeight.none')],
			'7xl': [relative(72), theme('lineHeight.none')],
			'8xl': [relative(96), theme('lineHeight.none')],
			'9xl': [relative(128), theme('lineHeight.none')],
		}),
		extend: {
			screens: {
				'hvr': { raw: '(hover: hover)' },
			},
			colors: {
				inherit: 'inherit',
			},
			inset: (theme, { negative }) => ({
				...width,
				...(negative(width)),
			}),
			lineHeight: {
				'extra-tight': 1.1,
			},
			maxWidth: {
				container: relative(1440),
			},
			padding: {
				full: '100%',
				'9/16': ratio(16, 9),
			},
			spacing: {
				em: '1em',
				'1/2em': '.5em',
			},
			transitionTimingFunction,
			width,
			zIndex: {
				'-1': -1,
				1: 1,
				2: 2,
			},
		},
	},
	variants: {},
	corePlugins: {},
};
