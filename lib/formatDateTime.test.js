const enUSLocaleData = require("intl/locale-data/json/en-US");
const nlNLLocaleData = require("intl/locale-data/json/nl-NL");

const formatDateTime = require("./formatDateTime");

describe("DateTime", () => {
  describe("en-US", () => {
    test("Timezone with seconds", () => {
      const result = formatDateTime("2020-01-01T22:06:45.103Z", {
        localeData: enUSLocaleData,
        timeZone: "Europe/Amsterdam",
        seconds: true
      });

      expect(result).toBe("01/01/2020, 11:06:45 PM");
    });
  });

  describe("nl-NL", () => {
    test("Timezone with seconds", () => {
      const result = formatDateTime("2020-01-01T22:06:45.103Z", {
        localeData: nlNLLocaleData,
        timeZone: "Europe/Amsterdam",
        seconds: true
      });

      expect(result).toBe("01/01/2020, 11:06:45 PM");
    });

    test("Timezone without seconds", () => {
      const result = formatDateTime("2020-01-01T22:06:45.103Z", {
        localeData: nlNLLocaleData,
        timeZone: "Europe/Amsterdam",
        seconds: false
      });

      expect(result).toBe("01/01/2020, 11:06 PM");
    });
  });
});
