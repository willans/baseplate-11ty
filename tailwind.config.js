const variables = require('./src/assets/variables.json');

// converters and calculators
const letterSpacing = value => `${value / 1000}em`;
const relative = (px, unit = 'rem', base = variables['browser-default-font-size']) => `${px / base}${unit}`;
const ratio = (x, y) => `${y / x * 100}%`;

// tailwind settings
module.exports = {
	mode: 'jit',
	purge: {
		content: [
			'./src/app/**/*.liquid',
			'./src/assets/purge-safelist.txt',
			'./src/assets/**/*.{js,vue}',
		],
	},
	theme: {
		screens: Object.fromEntries(
			Object.entries(variables.breakpoints).map(([name, px]) => [name, relative(px, 'em')])
		),
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
				focus: '#3b82f6',
				inherit: 'inherit',
			},
			inset: (theme, { negative }) => ({
				...theme('width'),
				...(negative(theme('width'))),
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
			transitionTimingFunction: Object.fromEntries(
				Object.entries(variables.easing).map(([name, v]) => [name, `cubic-bezier(${v.join(', ')})`])
			),
			width: Object.fromEntries([...Array(variables.columns).keys()].map(v => [
				`${v + 1}/${variables.columns}`,
				`${(v + 1) / variables.columns * 100}%`
			])),
			zIndex: {
				'-1': -1,
				1: 1,
				2: 2,
			},
		},
	},
	variants: {},
	corePlugins: {
		container: false,
	},
	plugins: [
		({ addComponents, theme }) => {
			const baseStyles = {
				marginInline: 'auto',
				paddingInline: theme('spacing.5'),
				width: `clamp(${theme('screens.sm')}, 100%, ${theme('maxWidth.container')})`,
			};

			const breakpointSetStyles = {
				'@screen md': {
					paddingInline: theme('spacing.8'),
				},
				'@screen xl': {
					paddingInline: theme('spacing.12'),
				},
			};

			const breakpoints = Object.fromEntries(
				Object.entries(variables.breakpoints).map(([name, px]) => [`@screen ${name}`, {
					'width': `clamp(${relative(px)}, 100%, ${relative(px + variables.breapointsRange)})`,
				}])
			);

			addComponents({
				'.container': Object.assign(baseStyles, Object.assign(...Object.keys(breakpoints).map(k => ({[k]: {...breakpoints[k], ...breakpointSetStyles[k]}})))),
			});
		},
	],
};
