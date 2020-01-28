const chunk = require("lodash/chunk");

function formatNumber(number, config) {
  const symbols = config.localeData.number.symbols.latn;

  const [significantDigits, decimalDigits] = String(number).split(/\./);

  const groups = chunk(significantDigits, 3).map(x => x.join(""));

  return `${groups.join(symbols.group)}${
    decimalDigits ? `${symbols.decimal}${decimalDigits}` : ""
  }`;
}

module.exports = formatNumber;
