// permissionsPlugin.js

import { ref, watch } from 'vue';

const permissionsPlugin = {
  install(app) {
    const userPermissions = ref({
      create: false,
      edit: false,
      delete: false,
      view: false,
      //---------admin--------
      create_admin:false,
      delete_admin:false,
      view_admin:false,
      edit_admin:false,
      //--------Site / School--------
      create_site: false,
      view_site: false,
      edit_site: false,
      delete_site: false,
      //--------stundent--------
      create_student: false,
      delete_student: false,
      view_student: false,
      edit_student: false,
      //--------staff--------
      create_staff: false,
      delete_staff: false,
      view_staff: false,
      edit_staff: false,
      //---------Course--------
      create_course: false,
      view_course: false,
      edit_course: false,
      delete_course: false,
      //---------Shop---------
      create_shop: false,
      delete_shop: false,
      view_shop: false,
      edit_shop: false,
      //-----------Transaction Hisotry--------
      transaction_history: false,
      //-----------Purchase History-----------
      purchase_history: false,
      //-----------Pending Installments-----------
      pending_installments: false,
      //-----------Refunds-----------
      refunds: false,
      //-----------Roles-----------
      roles: false,
      //-----------Topup-----------
      topup: false,
      //-----------wallet-----------
      wallet: false,
    });

    const checkIfPermission = (allPermissions) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'super_admin') {
          Object.keys(userPermissions.value).forEach((permission) => {
          userPermissions.value[permission] = true;
        });
      }else{
          Object.keys(userPermissions.value).forEach((permission) => {
          userPermissions.value[permission] = allPermissions.includes(permission);
        });
       }

    };
    //--------------REDIRECT IF NOT ALLOWED----------
    const redirectIfNotAllowed=(permission)=>{
      const router = app.config.globalProperties.$router;
      if(!userPermissions.value[permission]){
        router.go(-1);
        return;
      }
    };

    app.config.globalProperties.$permissions = {
      userPermissions,
      checkIfPermission,
      redirectIfNotAllowed,
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
