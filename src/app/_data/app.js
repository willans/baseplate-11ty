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
	language: 'en-GB',
	siteName: 'Baseplate',
	themeColor: '#ff585d',
	tracking: {
		gtm: 'xxx',
	},
	production: process.env.NODE_ENV === 'production',
};
