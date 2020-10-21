module.exports = {
	polyfills: [
		'Array.from',
		'Array.prototype.find',
		'Array.prototype.includes',
		'Element.prototype.classList',
		'Element.prototype.matches',
		'IntersectionObserver',
		'Promise',
	],
	language: 'en',
	siteName: 'Baseplate',
	themeColor: '#ff585d',
	tracking: {
		gtm: 'xxx',
	},
	environment: process.env.ELEVENTY_ENV,
};
