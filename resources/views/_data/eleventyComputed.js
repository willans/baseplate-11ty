module.exports = {
	meta: {
		title: data => data.title || null,
		description: data => data.description || null,
		type: data => data.type || null,
		shareTitle: data => data.shareTitle || data.title || null,
		shareDescription: data => data.shareDescription || data.description || null,
		socialImage: data => data.socialImage || '/static/img/meta/share.png',
	},
};
