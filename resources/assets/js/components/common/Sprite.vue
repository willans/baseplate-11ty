<template>
	<svg>
		<use :xlink:href="`${$props.url}#${$props.name}`" />
	</svg>
</template>

<script>
	import sprite from '../../../img/sprite.svg';

	export default {
		props: {
			name: {
				type: String,
				required: true,
			},

			url: {
				type: String,
				default: sprite,
			},
		},
	};
</script>
