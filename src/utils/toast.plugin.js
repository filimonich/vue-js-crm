// const showToast = (el, binding) => {
//   const message = binding.value;
//   M.toast({ html: message });
// };

// export const showLogoutToast = {
//   mounted(el, binding) {
//     el.addEventListener("click", () => {
//       showToast(el, binding);
//     });
//   },
// };

// export const install = app => {
//   app.directive("show-toast", showLogoutToast);
// };
const showToast = message => {
  M.toast({ html: message });
};

export const showLogoutToastDirective = {
  mounted(el, binding) {
    el.addEventListener("click", () => showToast(binding.value));
  },
};

export function install(app) {
  app.directive("show-toast", showLogoutToastDirective);
}
