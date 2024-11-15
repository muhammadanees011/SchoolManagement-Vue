const datepickerHelperPlugin = {
    install(app) {
      const handleScroll = () => {
        const datepickerPopup = document.querySelector('.mx-datepicker-popup');
        if (datepickerPopup) {
          datepickerPopup.style.display = 'none'; // Hide the popup
        }
        const focusedElement = document.querySelector('.mx-input:focus');
        if (focusedElement) {
          focusedElement.blur(); // Remove focus
        }
      };
  
      const handleFocus = () => {
        const datepickerPopup = document.querySelector('.mx-datepicker-popup');
        if (datepickerPopup) {
          datepickerPopup.style.display = 'block'; // Show the popup
        }
      };
  
      const attachListeners = () => {
        const inputElement = document.querySelector('.mx-input');
        if (inputElement) {
          inputElement.addEventListener('focus', handleFocus);
          window.addEventListener('scroll', handleScroll, true);
        }
      };
  
      const detachListeners = () => {
        const inputElement = document.querySelector('.mx-input');
        if (inputElement) {
          inputElement.removeEventListener('focus', handleFocus);
        }
        window.removeEventListener('scroll', handleScroll, true);
      };
  
      // Register global methods
      app.config.globalProperties.$datepickerHelper = {
        attachListeners,
        detachListeners,
      };
  
      // Automatically attach listeners in lifecycle hooks
      app.mixin({
        mounted() {
          attachListeners();
        },
        beforeUnmount() {
          detachListeners();
        },
      });
    },
  };
  
  export default datepickerHelperPlugin;
  