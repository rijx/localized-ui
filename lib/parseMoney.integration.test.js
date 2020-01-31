const mapValues = require("lodash/mapValues");
const localeData = require("require-all")({
  dirname: `${__dirname}/../node_modules/intl-data/locale-data/json`
});

const parseMoney = require("./parseMoney");

describe("parseMoney", () => {
  test("1000 EUR", () => {
    const expected = mapValues(localeData, () => {
      return {
        amount: 1000,
        currency: "EUR"
      };
    });

    const results = mapValues(localeData, (value, localeCode) => {
      return parseMoney("1000 EUR", {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("1000", () => {
    const expected = mapValues(localeData, () => {
      return {
        amount: 1000
      };
    });

    const results = mapValues(localeData, (value, localeCode) => {
      return parseMoney("1000", {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("1000,23 (nl-NL)", () => {
    const result = parseMoney("1000,23", {
      localeData: localeData["nl-NL"]
    });

    expect(result).toEqual({
      amount: 1000.23
    });
  });
});
