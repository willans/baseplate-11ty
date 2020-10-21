module.exports = (eleventyConfig) => {
	// copy public assets to build folder
	eleventyConfig.addPassthroughCopy({ 'resources/public': '.' });

	// add cache-controlled assets from mix-manifest.json
	eleventyConfig.addShortcode('mix', (file) => {
		try {
			const json = require('./_site/mix-manifest.json');
			return json[file];
		} catch {
			return file;
		}
	});

	eleventyConfig.addJavaScriptFunction('mix', (file) => {
		try {
			const json = require('./_site/mix-manifest.json');
			return json[file];
		} catch {
			return file;
		}
	});

	return {
		dir: {
			input: 'resources/views',
			output: '_site',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
		},
	};
};
