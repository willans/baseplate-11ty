module.exports = {
	plugins: [
		'vue',
	],
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
	],
	rules: {
		'vue/html-indent': [1, 'tab'],
		'vue/script-indent': [
			'warn',
			'tab',
			{
				'baseIndent': 1,
				'switchCase': 1,
			},
		],
	},
};
