const mapValues = require("lodash/mapValues");

const localeData = {
  "en-US": require("intl/locale-data/json/en-US"),
  "nl-NL": require("intl/locale-data/json/nl-NL"),
  "fr-FR": require("intl/locale-data/json/fr-FR"),
  "pt-PT": require("intl/locale-data/json/pt-PT")
};

const formatMoney = require("./formatMoney");
const formatNumber = require("./formatNumber");

jest.mock("./formatNumber");

describe("formatMoney", () => {
  test("use currency symbol", () => {
    const expected = {
      "en-US": "€{number}",
      "nl-NL": "€\xa0{number}",
      "fr-FR": "{number}\xa0€",
      "pt-PT": "{number}\xa0€"
    };

    formatNumber.mockReturnValue("{number}");

    const results = mapValues(expected, (value, localeCode) => {
      return formatMoney(1, {
        localeData: localeData[localeCode],
        currency: "EUR"
      });
    });

    expect(results).toEqual(expected);
  });

  test("fallback to ISO code", () => {
    const expected = {
      "en-US": "AWG{number}",
      "nl-NL": "AWG\xa0{number}",
      "fr-FR": "{number}\xa0AWG",
      "pt-PT": "{number}\xa0AWG"
    };

    formatNumber.mockReturnValue("{number}");

    const results = mapValues(expected, (value, localeCode) => {
      return formatMoney(1, {
        localeData: localeData[localeCode],
        currency: "AWG"
      });
    });

    expect(results).toEqual(expected);
  });
});
