<template>
	<div>
		<formulate-form
			v-model="$data.form"
			:class="{
				'formulate-form--submited': $data.response,
			}"
			:schema="$props.schema"
			:disabled="$data.loading || $data.response"
			@submit="onSubmit"
		/>

		<aside
			v-if="$data.response"
			class="relative z-1 -mt-15"
		>
			<h1
				class="x-h1"
				v-text="$data.response.title"
			/>

			<p
				v-if="$data.response.copy"
				class="mt-em"
				v-text="$data.response.copy"
			/>
		</aside>
	</div>
</template>

<script>
	import form from '../../mixins/form';

	export default {
		mixins: [
			form,
		],
	};
</script>
