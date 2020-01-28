function parseNumber(numberString, config) {
  const symbols = config.localeData.number.symbols.latn;

  return Number(
    numberString.replace(symbols.group, "").replace(symbols.decimal, ".")
  );
}

module.exports = parseNumber;
