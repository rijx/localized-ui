const parseNumber = require("./parseNumber");

function parseMoney(input, config) {
  const isoCodeMatch = /\b([A-Z]{3})\b/i.exec(input);

  if (isoCodeMatch) {
    return {
      amount: parseNumber(input.replace(isoCodeMatch[1], "").trim(), config),
      currency: isoCodeMatch[1]
    };
  }

  if (config && config.localeData) {
    const localCurrencySymbol = Object.values(
      config.localeData.number.currencies
    ).find(x => input.includes(x));

    if (localCurrencySymbol) {
      return {
        amount: parseNumber(
          input.replace(localCurrencySymbol, "").trim(),
          config
        ),
        currency: Object.keys(config.localeData.number.currencies).find(
          x => config.localeData.number.currencies[x] == localCurrencySymbol
        )
      };
    }
  }

  const amount = parseNumber(input, config);

  if (amount == null) {
    return;
  }

  return { amount };
}

module.exports = parseMoney;
