const Intl = require("intl");
const mapValues = require("lodash/mapValues");
const localeData = require("require-all")({
  dirname: `${__dirname}/../node_modules/intl-data/locale-data/json`
});

const parseDate = require("./formatDate");

describe("Date formatter", () => {
  test("Medium", () => {
    const date = new Date("2020-01-01");
    const expected = mapValues(() => "2020-01-01");

    for (const localeCode in localeData) {
      try {
        expected[localeCode] = "2020-01-01";
      } catch (err) {
        console.error(localeCode, err);
      }
    }

    const results = mapValues(expected, (value, localeCode) => {
      try {
        const localDate = Intl.DateTimeFormat(localeCode, {
          dateStyle: "medium"
        }).format(date);

        return parseDate(localDate, {
          localeData: localeData[localeCode]
        });
      } catch (err) {
        console.error(localeCode, err);
      }
    });

    expect(results).toEqual(expected);
  });
});
