function wrapFunction(fn, configIndex, baseConfig) {
  return function(...args) {
    const patchedArgs = args.slice();

    patchedArgs[configIndex] = {
      ...baseConfig,
      ...patchedArgs[configIndex]
    };

    return fn(...patchedArgs);
  };
}

function wrap(baseConfig) {
  return {
    formatDate: wrapFunction(require("./formatDate"), 1, baseConfig),
    formatDateTime: wrapFunction(require("./formatDateTime"), 1, baseConfig),
    formatMoney: wrapFunction(require("./formatMoney"), 1, baseConfig),
    formatNumber: wrapFunction(require("./formatNumber"), 1, baseConfig),
    formatPercentage: wrapFunction(
      require("./formatPercentage"),
      1,
      baseConfig
    ),
    parseDate: wrapFunction(require("./parseDate"), 1, baseConfig),
    parseDateTime: wrapFunction(require("./parseDateTime"), 1, baseConfig),
    parseMoney: wrapFunction(require("./parseMoney"), 1, baseConfig),
    parseNumber: wrapFunction(require("./parseNumber"), 1, baseConfig),
    parsePercentage: wrapFunction(require("./parsePercentage"), 1, baseConfig),
    translate: wrapFunction(require("./translate"), 2, baseConfig)
  };
}

module.exports = wrap;
