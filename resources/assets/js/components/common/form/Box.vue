<template>
	<label
		class="flex items-start e-p-body-small"
		:disabled="$props.context.attributes.disabled"
		:for="$props.context.id"
	>
		<input
			v-model="$props.context.model"
			v-bind="$props.context.attributes"
			:value="$props.context.value"
			:type="$props.context.type"
			class="sr-only"
			@focus="$data.hasKeyboardFocus = isKeyboard()"
			@blur="$data.hasKeyboardFocus = false"
		>

		<div class="relative flex-shrink-0 w-8 mr-2">
			&nbsp;

			<placeholder
				:class="[
					'pt-full absolute top-1/2 left-0 w-full transform -translate-y-1/2',
					{
						'shadow-focus': $data.hasKeyboardFocus,
					},
				]"
			>
				<div
					:class="[
						'flex items-center justify-center border-1 border-grey-900',
						// 'transition-colors duration-200 ease-out-cubic',
						'bg-grey-100',
						{
							'rounded-full': $props.context.type === 'radio',
							'bg-green': $props.context.hasValue,
						},
					]"
				>
					<icon
						:class="[
							'transform transition-transform duration-200 ease-out-cubic',
							$props.context.hasValue ? 'scale-90' : 'scale-0',
						]"
						name="check"
					/>
				</div>
			</placeholder>
		</div>

		<span
			class="self-center cursor-pointer"
			aria-hidden="true"
			v-html="$props.context.label"
		/>
	</label>
</template>

<script>
	import Input from '../../../mixins/input';

	export default {
		mixins: [Input],

		props: {
			context: {
				type: Object,
				required: true,
			},
		},
	};
</script>
