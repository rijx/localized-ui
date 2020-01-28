const mapValues = require("lodash/mapValues");

const localeData = {
  "en-US": require("intl-data/locale-data/json/en-US"),
  "nl-NL": require("intl-data/locale-data/json/nl-NL"),
  "fr-FR": require("intl-data/locale-data/json/fr-FR"),
  "pt-PT": require("intl-data/locale-data/json/pt-PT")
};

const formatPercentage = require("./formatPercentage");

describe("formatPercentage", () => {
  test("21%", () => {
    const expected = {
      "en-US": "21%",
      "nl-NL": "21%",
      "fr-FR": "21\xa0%",
      "pt-PT": "21%"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatPercentage(0.21, {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("-50%", () => {
    const expected = {
      "en-US": "-50%",
      "nl-NL": "-50%",
      "fr-FR": "-50\xa0%",
      "pt-PT": "-50%"
    };

    const results = mapValues(expected, (value, localeCode) => {
      return formatPercentage(-0.5, {
        localeData: localeData[localeCode]
      });
    });

    expect(results).toEqual(expected);
  });

  test("custom percent sign", () => {
    const result = formatPercentage(0.1, {
      localeData: {
        number: {
          patterns: {
            percent: {
              positivePattern: "{number}{percentSign}"
            }
          },
          symbols: {
            latn: {
              percentSign: "#"
            }
          }
        }
      }
    });

    expect(result).toBe("10#");
  });

  test("custom format", () => {
    const result = formatPercentage(0.1, {
      localeData: {
        number: {
          patterns: {
            percent: {
              positivePattern: "{percentSign}{number}{percentSign}"
            }
          },
          symbols: {
            latn: {
              percentSign: "%"
            }
          }
        }
      }
    });

    expect(result).toBe("%10%");
  });
});
