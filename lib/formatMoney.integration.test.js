const mapValues = require("lodash/mapValues");
const localeData = require("require-all")({
  dirname: `${__dirname}/../node_modules/intl-data/locale-data/json`
});

const formatMoney = require("./formatMoney");

describe("formatMoney", () => {
  test("1000 EUR", () => {
    const results = mapValues(localeData, (value, localeCode) => {
      return formatMoney(1000, {
        localeData: localeData[localeCode],
        currency: "EUR"
      });
    });

    expect(results).toMatchSnapshot();
  });

  test("1000 JPY", () => {
    const results = mapValues(localeData, (value, localeCode) => {
      return formatMoney(1000, {
        localeData: localeData[localeCode],
        currency: "JPY"
      });
    });

    expect(results).toMatchSnapshot();
  });
});
