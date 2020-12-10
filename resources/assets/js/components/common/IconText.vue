<template>
	<component
		:is="cElement"
		:class="[
			'items-center space-x-3',
			$props.inline ? 'inline-flex' : 'flex',
			{
				'flex-row-reverse space-x-reverse': $props.iconAfter,
			},
		]"
	>
		<icon class="flex-shrink-0" :name="icon" />

		<span class="ml-1" v-html="text" />
	</component>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				required: true,
			},

			icon: {
				type: String,
				required: true,
			},

			iconAfter: Boolean,

			inline: Boolean,
		},
	};
</script>
