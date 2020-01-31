const data = require("../data/ISO4217_decimals");

function getCurrencyDecimals(currencyCode) {
  for (const decimals in data) {
    const currencyCodes = data[decimals].split(/,/g);

    if (currencyCodes.includes(currencyCode)) {
      return Number(decimals);
    }
  }
}

module.exports = getCurrencyDecimals;
