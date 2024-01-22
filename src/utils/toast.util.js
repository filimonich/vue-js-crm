import M from "materialize-css";

export default {
  install: app => {
    app.config.globalProperties.$showToast = function (message) {
      M.toast({ html: message });
    };

    app.config.globalProperties.$handleError = function (error) {
      if (typeof M !== "undefined") {
        M.toast({ html: error });
      } else {
        console.error(
          "Объект M не определен. Возможно, Materialize не был правильно инициализирован."
        );
      }
    };
  },
};
