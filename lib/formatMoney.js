const formatNumber = require("./formatNumber");
const getCurrencyDecimals = require("./getCurrencyDecimals");

function formatMoney(amount, config) {
  if (!config.currency) {
    return formatNumber(amount, config);
  }

  const pattern = config.localeData.number.patterns.currency.positivePattern;

  return pattern
    .replace(
      /\{currency\}/,
      config.localeData.number.currencies[config.currency] || config.currency
    )
    .replace(
      /\{number\}/,
      formatNumber(amount, {
        ...config,
        decimals: getCurrencyDecimals(config.currency)
      })
    );
}

module.exports = formatMoney;
