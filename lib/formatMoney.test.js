const mapValues = require("lodash/mapValues");

const localeData = {
  "en-US": require("intl-data/locale-data/json/en-US"),
  "nl-NL": require("intl-data/locale-data/json/nl-NL"),
  "fr-FR": require("intl-data/locale-data/json/fr-FR"),
  "pt-PT": require("intl-data/locale-data/json/pt-PT")
};

const formatMoney = require("./formatMoney");
const formatNumber = require("./formatNumber");
const getCurrencyDecimals = require("./getCurrencyDecimals");

jest.mock("./formatNumber");
jest.mock("./getCurrencyDecimals");

describe("formatMoney", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  test("fall back to number if currency is missing", () => {
    const expected = {
      "en-US": "{number}",
      "nl-NL": "{number}",
      "fr-FR": "{number}",
      "pt-PT": "{number}"
    };

    formatNumber.mockReturnValue("{number}");

    const results = mapValues(expected, (value, localeCode) => {
      return formatMoney(1, {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("add decimal places according to currency", () => {
    formatNumber.mockReturnValue("{number}");
    getCurrencyDecimals.mockReturnValue(2);

    formatMoney(8, {
      localeData: localeData["en-US"],
      currency: "USD"
    });

    expect(formatNumber.mock.calls.length).toBe(1);
    expect(formatNumber.mock.calls[0][0]).toBe(8);
    expect(formatNumber.mock.calls[0][1].decimals).toBe(2);
  });
});
