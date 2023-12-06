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

const appInstance = createApp(App)
// Trigger a custom event when Stripe.js is loaded
const stripeScript = document.querySelector('script[src="https://js.stripe.com/v3/"]');
stripeScript.onload = () => {
  document.dispatchEvent(new Event('stripe-js-loaded'));
};
appInstance.use(store)
appInstance.use(SnackbarService)
appInstance.component('vue3-snackbar', Vue3Snackbar)
appInstance.use(router)
appInstance.use(MaterialDashboard)
appInstance.mount('#app')
