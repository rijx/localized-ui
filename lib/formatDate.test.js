const mapValues = require("lodash/mapValues");

const localeData = {
  "en-US": require("intl-data/locale-data/json/en-US"),
  "nl-NL": require("intl-data/locale-data/json/nl-NL"),
  "fr-FR": require("intl-data/locale-data/json/fr-FR"),
  "pt-PT": require("intl-data/locale-data/json/pt-PT")
};

const formatDate = require("./formatDate");

describe("Date formatter", () => {
  test("Short", () => {
    const expected = {
      "en-US": "1/1/2020",
      "nl-NL": "01-01-2020",
      "fr-FR": "01/01/2020",
      "pt-PT": "01/01/2020"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatDate("2020-01-01", {
        localeData: localeData[localeCode],
        dateStyle: "short"
      });
    });

    expect(results).toEqual(expected);
  });

  test("Medium", () => {
    const expected = {
      "en-US": "Jan 1, 2020",
      "nl-NL": "1 jan. 2020",
      "fr-FR": "1 janv. 2020",
      "pt-PT": "01/01/2020"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatDate("2020-01-01", {
        localeData: localeData[localeCode],
        dateStyle: "medium"
      });
    });

    expect(results).toEqual(expected);
  });
});
