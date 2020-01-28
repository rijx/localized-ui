const mapValues = require("lodash/mapValues");
const Intl = require("intl");

const localeData = require("require-all")({
  dirname: `${__dirname}/../node_modules/intl-data/locale-data/json`
});

const formatDate = require("./formatDate");

describe("Date formatter", () => {
  test("Medium", () => {
    const date = new Date("2020-01-01");

    const expected = {};

    for (const localeCode in localeData) {
      try {
        expected[localeCode] = Intl.DateTimeFormat(localeCode, {
          dateStyle: "medium"
        }).format(date);
      } catch (err) {
        console.error(localeCode, err);
      }
    }

    const results = mapValues(expected, (value, localeCode) => {
      try {
        return formatDate("2020-01-01", {
          localeData: localeData[localeCode],
          dateStyle: "medium"
        });
      } catch (err) {
        console.error(localeCode, err);
      }
    });
  
    expect(results).toEqual(expected);
  });
});
