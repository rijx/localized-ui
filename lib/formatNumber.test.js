const mapValues = require("lodash/mapValues");

const localeData = {
  "en-US": require("intl/locale-data/json/en-US"),
  "nl-NL": require("intl/locale-data/json/nl-NL"),
  "fr-FR": require("intl/locale-data/json/fr-FR"),
  "pt-PT": require("intl/locale-data/json/pt-PT")
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
      "en-US": "123,456.78",
      "nl-NL": "123.456,78",
      "fr-FR": "123\xa0456,78",
      "pt-PT": "123\xa0456,78"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatNumber(123456.78, {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });
});
