<template>
	<component
		:is="cElement"
		v-bind="$props.context.attributes"
		class="e-button"
	>
		<slot>
			<span v-text="$props.context.label || $props.title" />
		</slot>
	</component>
</template>

<script>
	export default {
		props: {
			context: {
				type: Object,
				default: () => ({}),
			},

			title: {
				type: String,
				default: null,
			},
		},

		computed: {
			cElement: function () {
				return this.$attrs.href ? 'a' : 'button';
			},
		},
	};
</script>
