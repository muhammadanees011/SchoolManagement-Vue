// env.js
import { ref } from 'vue';

const envPlugin = {
  install(app) {
    const env_vars = ref({
        // BASE_URL:'http://127.0.0.1:8000',
         // BASE_URL: 'https://api.student-pay.co.uk',
        BASE_URL: 'https://stagingapi.student-pay.co.uk',
    });
    app.config.globalProperties.$env_vars = env_vars.value
    app.provide('env_vars', app.config.globalProperties.env_vars);
  },
};

export default envPlugin;
