const nlNLlocaleData = require("intl/locale-data/json/nl-NL");
const nlDateLocale = require("date-fns/locale/nl");

const parseDateTime = require("./parseDateTime");

describe("parseDateTime", () => {
  test("1 jan. 2020 18:32 (nl-NL)", () => {
    const result = parseDateTime("1 jan. 2020 18:32", {
      localeData: nlNLlocaleData,
      dateLocale: nlDateLocale,
      timeZone: "Europe/Amsterdam"
    });

    expect(result).toBe("2020-01-01T17:32:00.000Z");
  });

  describe("DST", () => {
    test("1 jul. 2020 18:32 (nl-NL)", () => {
      const result = parseDateTime("1 jul. 2020 18:32", {
        localeData: nlNLlocaleData,
        dateLocale: nlDateLocale,
        timeZone: "Europe/Amsterdam"
      });

      expect(result).toBe("2020-07-01T16:32:00.000Z");
    });
  });
});
