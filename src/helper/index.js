// permissionsPlugin.js

import { ref, watch } from 'vue';

const permissionsPlugin = {
  install(app) {
    const userPermissions = ref({
      create: false,
      edit: false,
      delete: false,
      view: false,
    });

    const checkIfPermission = (allPermissions) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'super_admin' || user && user.role === 'organization_admin') {
          Object.keys(userPermissions.value).forEach((permission) => {
          userPermissions.value[permission] = true;
        });
      }else{
          Object.keys(userPermissions.value).forEach((permission) => {
          userPermissions.value[permission] = allPermissions.includes(permission);
        });
       }

    };

    app.config.globalProperties.$permissions = {
      userPermissions,
      checkIfPermission,
    };

    app.provide('permissions', app.config.globalProperties.$permissions);
    // Watch for changes in Vuex store's getPermissions getter and update userPermissions accordingly
    watch(() => app.config.globalProperties.$store.getters.getPermissions, (newVal, oldVal) => {
      console.log(oldVal);
      app.config.globalProperties.$permissions.checkIfPermission(newVal);
    });
  },
};

export default permissionsPlugin;
