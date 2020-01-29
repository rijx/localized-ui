const chunk = require("lodash/chunk");

function formatNumber(number, config) {
  const symbols = config.localeData.number.symbols.latn;

  const [significantDigits, decimalDigits] = String(Number(number) || 0).split(
    /\./
  );

  const groups = chunk(significantDigits.split("").reverse(), 3)
    .reverse()
    .map(x => x.reverse().join(""));

  return `${groups.join(symbols.group)}${
    decimalDigits ? `${symbols.decimal}${decimalDigits}` : ""
  }`;
}

module.exports = formatNumber;
