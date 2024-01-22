import { createApp } from 'vue'
import App from './App.vue'
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


const appInstance = createApp(App)
appInstance.use(store)
appInstance.use(SnackbarService)
appInstance.component('vue3-snackbar', Vue3Snackbar)
appInstance.use(router)
appInstance.use(MaterialDashboard)
appInstance.use(DropZone)
appInstance.use(permissionsPlugin);
appInstance.mount('#app')
