/* eslint-disable no-new */

import 'what-input';

import Vue from 'vue';

import './etc/forms';

// Common
import EButton from './components/common/Button';
import ETable from './components/common/Table';
import Breadcrumb from './components/common/Breadcrumb';
import Icon from './components/common/Icon';
import IconText from './components/common/IconText';
import Pagination from './components/common/Pagination';
import Placeholder from './components/common/Placeholder';

// Global
Vue.component('EButton', EButton);
Vue.component('ETable', ETable);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('Icon', Icon);
Vue.component('IconText', IconText);
Vue.component('Pagination', Pagination);
Vue.component('Placeholder', Placeholder);

new Vue({
	el: '#app',

	// Local
	components: {
	},

	mounted() {},
});
