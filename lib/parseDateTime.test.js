const enUSlocaleData = require("intl-data/locale-data/json/en-US");
const nlNLlocaleData = require("intl-data/locale-data/json/nl-NL");

const parseDateTime = require("./parseDateTime");

describe("parseDateTime", () => {
  test("1 jan. 2020 18:32 (nl-NL)", () => {
    const result = parseDateTime("1 jan. 2020 18:32", {
      localeData: nlNLlocaleData,
      timeZone: "Europe/Amsterdam"
    });

    expect(result).toBe("2020-01-01T17:32:00.000Z");
  });

  describe("DST", () => {
    test("1 jul. 2020 18:32 (nl-NL)", () => {
      const result = parseDateTime("1 jul. 2020 18:32", {
        localeData: nlNLlocaleData,
        timeZone: "Europe/Amsterdam"
      });

      expect(result).toBe("2020-07-01T16:32:00.000Z");
    });

    test("should not parse in en-US: 1 jul. 2020 18:32 (nl-NL)", () => {
      const result = parseDateTime("1 jul. 2020 18:32", {
        localeData: enUSlocaleData,
        timeZone: "Europe/Amsterdam"
      });

      expect(result).toBeUndefined();
    });
  });
});
