const mapValues = require("lodash/mapValues");

const dateLocales = {
  "en-US": require("date-fns/locale/en-US"),
  "nl-NL": require("date-fns/locale/nl"),
  "fr-FR": require("date-fns/locale/fr"),
  "pt-PT": require("date-fns/locale/pt")
};

const formatDate = require("./formatDate");

describe("Date formatter", () => {
  test("Short", () => {
    const expected = {
      "en-US": "01/01/2020",
      "nl-NL": "01-01-2020",
      "fr-FR": "01/01/2020",
      "pt-PT": "01/01/2020"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatDate("2020-01-01", {
        dateLocale: dateLocales[localeCode],
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
      "pt-PT": "1 de jan de 2020"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatDate("2020-01-01", {
        dateLocale: dateLocales[localeCode],
        dateStyle: "medium"
      });
    });

    expect(results).toEqual(expected);
  });
});
