const { BigNumber } = require("bignumber.js");

const formatNumber = require("./formatNumber");

function formatPercentage(value, config) {
  const format =
    value >= 0
      ? config.localeData.number.patterns.percent.positivePattern
      : config.localeData.number.patterns.percent.negativePattern;

  const number = Math.abs(
    BigNumber(value)
      .times(100)
      .toNumber()
  );

  return format
    .replace(/\{number\}/g, formatNumber(number, config))
    .replace(
      /\{percentSign\}/g,
      config.localeData.number.symbols.latn.percentSign
    )
    .replace(/\{minusSign\}/g, config.localeData.number.symbols.latn.minusSign);
}

module.exports = formatPercentage;
