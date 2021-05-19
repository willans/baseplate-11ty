const options = {
	dir: {
		input: 'src/app',
		output: '_site',
		includes: '_includes',
		layouts: '_layouts',
		data: '_data',
	},
	// passthroughFileCopy: true,
	// templateFormats: ['html', 'md', 'liquid'],
	// htmlTemplateEngine: 'liquid',
	// dataTemplateEngine: 'liquid',
	// markdownTemplateEngine: 'liquid',
};

module.exports = (eleventyConfig) => {
	// copy public assets to build folder
	eleventyConfig.addPassthroughCopy({ 'src/public': '.' });

	// add cache-controlled assets from mix-manifest.json
	eleventyConfig.addShortcode('mix', (file) => {
		try {
			const json = require('./_site/mix-manifest.json');
			return json[file];
		} catch {
			return file;
		}
	});

	eleventyConfig.setBrowserSyncConfig({
		files: [
			'_site/compiled/css',
			'_site/compiled/js',
			// '_site/*.html',
			'!**/*.map',
		],
	});

	eleventyConfig.setBrowserSyncConfig({
		port: 3001,
	});

	return options;
};
