const nlNLlocaleData = require("intl/locale-data/json/nl-NL");
const nlDateLocale = require("date-fns/locale/nl");
const enUSlocaleData = require("intl/locale-data/json/en-US");

const parseDate = require("./parseDate");

describe("parseDate", () => {
  test("1 jan. 2020 (nl-NL)", () => {
    const result = parseDate("1 jan. 2020", {
      localeData: nlNLlocaleData,
      dateLocale: nlDateLocale
    });

    expect(result).toBe("2020-01-01");
  });

  test("January 1, 2020 (en-US)", () => {
    const result = parseDate("January 1, 2020", {
      localeData: enUSlocaleData
    });

    expect(result).toBe("2020-01-01");
  });
});
