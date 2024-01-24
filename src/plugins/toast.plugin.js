export default {
  install: app => {
    app.config.globalProperties.$showToast = function (message) {
      M.toast({ html: message });
    };

    app.config.globalProperties.$handleError = function (error) {
      M.toast({ html: error });
    };
  },
};
