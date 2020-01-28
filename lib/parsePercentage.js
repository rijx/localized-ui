const parseNumber = require("./parseNumber");

function parsePercentage(input, config) {
  const symbols = config.localeData.number.symbols.latn;

  return (
    parseNumber(input.replace(symbols.percentSign, "").trim(), config) / 100
  );
}

module.exports = parsePercentage;
