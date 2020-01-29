const { BigNumber } = require("bignumber.js");

const parseNumber = require("./parseNumber");

function parsePercentage(input, config) {
  const symbols = config.localeData.number.symbols.latn;

  return BigNumber(
    parseNumber(input.replace(symbols.percentSign, "").trim(), config)
  )
    .times(0.01)
    .toNumber();
}

module.exports = parsePercentage;
