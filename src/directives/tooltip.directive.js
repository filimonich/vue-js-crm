const tooltipDirective = {
  mounted(el, binding) {
    initializeTooltip(el, binding.value);
  },
  updated(el, binding) {
    updateTooltip(el, binding.value);
  },
};

function initializeTooltip(el, value) {
  const options = {
    position: "top",
    html: value,
  };
  M.Tooltip.init(el, options);
}

function updateTooltip(el, value) {
  const instance = M.Tooltip.getInstance(el);
  if (instance) {
    instance.destroy();
  }
  initializeTooltip(el, value);
}

export default tooltipDirective;
