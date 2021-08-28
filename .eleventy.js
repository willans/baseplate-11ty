const Image = require('@11ty/eleventy-img');
const reverse = require('lodash/reverse');

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

const imageConfig = {
	transforms: {
		default: [
			{
				min: 1248,
				width: 400,
			},
			{
				min: 768,
				width: 200,
			},
			{
				width: 100,
			},
		],
	},
};

const imgShortcode = async (src, alt, config = 'default', outputFormat = ['webp','jpeg']) => {
	if(alt === undefined) {
		throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
	}

	const transform = imageConfig.transforms[config];
	const widths = Object.values(transform.map(x => x.width));

	let stats = await Image(src, {
		urlPath: '/compiled/img',
		outputDir: `./${options.dir.output}/compiled/img`,
		widths: widths,
		formats: outputFormat,
		// dryRun: true,
	});

	console.log('transform', transform);
	console.log('widths', widths);
	console.log('stats', stats);

	const img = {
		src: stats.jpeg ? reverse(Object.values(stats.jpeg.map(x => x.url))) : null,
		webp: stats.webp ? reverse(Object.values(stats.webp.map(x => x.url))) : null,
		sizes: Object.values(transform.filter(x => x.min).map(x => x.min)),
		alt,
	};

	return JSON.stringify(img);
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

	eleventyConfig.addLiquidShortcode('img', imgShortcode);

	eleventyConfig.setBrowserSyncConfig({
		files: [
			'_site/compiled/css',
			'_site/compiled/js',
			// '_site/*.html',
			'!**/*.map',
		],
		port: 3001,
	});

	// testing
	// const newimage = imgShortcode('https://images.unsplash.com/photo-1608178398319-48f814d0750c', 'ALT TEXT HERE');
	// const newimage = imgShortcode('https://res.cloudinary.com/demo/image/upload/w_400,c_crop,ar_1:2,g_face/lady.jpg', 'ALT TEXT HERE');

	return options;
};
