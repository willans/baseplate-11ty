module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'resources/public': '.' });

	return {
		dir: {
			input: 'resources/views',
			output: '_site',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
		},
		env: process.env.NODE_ENV,
	};
};
