const mapValues = require("lodash/mapValues");

const localeData = {
  "en-US": require("intl-data/locale-data/json/en-US"),
  "nl-NL": require("intl-data/locale-data/json/nl-NL"),
  "fr-FR": require("intl-data/locale-data/json/fr-FR"),
  "pt-PT": require("intl-data/locale-data/json/pt-PT")
};

const formatNumber = require("./formatNumber");

describe("formatNumber", () => {
  test("Simple numbers", () => {
    const expected = {
      "en-US": "123",
      "nl-NL": "123",
      "fr-FR": "123",
      "pt-PT": "123"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatNumber(123, {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("Group and decimal", () => {
    const expected = {
      "en-US": "12,345.678",
      "nl-NL": "12.345,678",
      "fr-FR": "12\xa0345,678",
      "pt-PT": "12\xa0345,678"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatNumber(12345.678, {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("Undefined becomes 0", () => {
    const expected = {
      "en-US": "0",
      "nl-NL": "0",
      "fr-FR": "0",
      "pt-PT": "0"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatNumber(undefined, {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("Decimals config option", () => {
    const expected = {
      "en-US": "4.123",
      "nl-NL": "4,123",
      "fr-FR": "4,123",
      "pt-PT": "4,123"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatNumber(4.123456789, {
        localeData: localeData[localeCode],
        decimals: 3
      });
    });

    expect(results).toEqual(expected);
  });

  test("Decimals = 0 config option", () => {
    const expected = {
      "en-US": "4",
      "nl-NL": "4",
      "fr-FR": "4",
      "pt-PT": "4"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatNumber(4.123456789, {
        localeData: localeData[localeCode],
        decimals: 0
      });
    });

    expect(results).toEqual(expected);
  });
});
