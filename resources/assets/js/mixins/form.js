export default {
	props: {
		action: {
			type: String,
			default: null,
		},
	},

	data() {
		return {
			errors: {},
			form: {},
			loading: false,
			response: null,
		};
	},

	methods: {
		async onSubmit() {
			this.$data.loading = true;

			const body = new FormData();

			body.append('CRAFT_CSRF_TOKEN', window.app.csrf);
			Object.keys(this.$data.form).forEach(key => body.append(key, this.$data.form[key]));

			try {
				const response = await window.fetch(this.$props.action, {
					method: 'POST',
					body,
					headers: {
						Accept: 'application/json',
					},
				});

				const { data, error } = await response.json();
				const { ok, status } = response;

				if (ok) {
					this.$data.errors = null;
					this.$data.response = data;
				} else if (status === 422) {
					this.$data.errors = error;
				} else {
					// passed client-side validation but failed unexpectedly
					throw error;
				}
			} catch (error) {
				// handle thrown + network errors
				window.alert(error); // eslint-disable-line no-alert
			}

			this.$data.loading = false;
		},
	},
};
