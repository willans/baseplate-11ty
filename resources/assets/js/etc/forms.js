import Vue from 'vue';
import VueFormulate from '@braid/vue-formulate';

import Box from '../components/common/form/Box';
import ESelect from '../components/common/form/Select';

Vue.component('Box', Box);
Vue.component('ESelect', ESelect);

Vue.use(VueFormulate, {
	library: {
		checkbox: {
			component: 'Box',
		},
		button: {
			component: 'EButton',
		},
		radio: {
			component: 'Box',
		},
		submit: {
			component: 'EButton',
		},
		select: {
			component: 'ESelect',
		},
	},
	classes: {
		outer: '',
		wrapper: '',
		element: '',
		input: ({ classification }) => {
			switch (classification) {
				case 'box':
				case 'button':
				case 'submit':
				case 'group':
					return null;
				default:
					return 'e-input block w-full p-4 bg-white border border-grey-500 rounded-none text-black focus:border-grey-700';
			}
		},
		label: ({ classification }) => {
			switch (classification) {
				case 'box':
					return 'sr-only';
				default:
					return 'block mb-1/2em cursor-pointer font-bold leading-snug';
			}
		},
		help: 'text-sm mt-1/2em text-gray-600',
		errors: '',
		error: 'block relative mt-1/2em text-red italic text-sm leading-snug',
		decorator: 'bg-green',
	},
});
