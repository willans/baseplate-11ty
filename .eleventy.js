module.exports =  {
	dir: {
		input: 'resources/views',
		output: 'public',
		includes: 'resources/views/_includes',
		layouts: 'resources/views/_layouts',
		data: 'resources/views/_data',
	},
	env: process.env.NODE_ENV,
};
