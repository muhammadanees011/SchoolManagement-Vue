import { createApp } from 'vue'
import App from './App.vue'
import Emitter from 'tiny-emitter'
import store from './store'
import router from './router'
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import './assets/css/main.css'
import MaterialDashboard from './material-dashboard'
import { SnackbarService, Vue3Snackbar } from 'vue3-snackbar'
import 'vue3-snackbar/dist/style.css'
import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import permissionsPlugin from './helper/index';
import envPlugin from './helper/envPlugin';
import globalHelperPlugin from './helper/globalHelperPlugin'; 
import popupHelper from './helper/popupHelper';


const appInstance = createApp(App)
appInstance.config.globalProperties.$msalInstance = {};
appInstance.config.globalProperties.$emitter = new Emitter();
appInstance.use(store)
appInstance.use(SnackbarService)
appInstance.component('vue3-snackbar', Vue3Snackbar)
appInstance.use(router,appInstance)
appInstance.use(MaterialDashboard)
appInstance.use(DropZone)
appInstance.use(permissionsPlugin);
appInstance.use(envPlugin);
appInstance.use(globalHelperPlugin);
appInstance.use(popupHelper);
appInstance.mount('#app')
