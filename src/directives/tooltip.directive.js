const tooltipDirective = {
  mounted(el, binding) {
    const options = {
      position: "top",
      html: binding.value,
    };
    M.Tooltip.init(el, options);
  },
};

export default tooltipDirective;