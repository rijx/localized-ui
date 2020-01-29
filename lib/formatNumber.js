const chunk = require("lodash/chunk");

function formatNumber(number, config) {
  number = Number(number) || 0;

  if (config.decimals != null) {
    number = Number(number.toFixed(config.decimals || 0));
  }

  const symbols = config.localeData.number.symbols.latn;

  const [significantDigits, decimalDigits] = String(number).split(/\./);

  const groups = chunk(significantDigits.split("").reverse(), 3)
    .reverse()
    .map(x => x.reverse().join(""));

  return `${groups.join(symbols.group)}${
    decimalDigits ? `${symbols.decimal}${decimalDigits}` : ""
  }`;
}

module.exports = formatNumber;
