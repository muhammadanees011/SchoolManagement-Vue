const globalHelperPlugin = {
    install(app) {
      const buttonColor = () => {     
        const bgColor = app.config.globalProperties.$store.getters.getBrandingSetting.primary_color !== 'null'
          ? app.config.globalProperties.$store.getters.getBrandingSetting.primary_color
          : '#010A21';
  
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
          button.style.backgroundColor = bgColor;
        });

        const pagination = document.querySelectorAll('.pagination li.active a');
        pagination.forEach(page => {
          page.style.backgroundColor = bgColor;
        });


      };

      app.config.globalProperties.$globalHelper = {
        buttonColor,
      };
    }
  };
  
  export default globalHelperPlugin;
  