const nlNLLocaleData = require("intl/locale-data/json/nl-NL");

const parseNumber = require("./parseNumber");

describe("parseNumber", () => {
  test("nl-NL", () => {
    const result = parseNumber("1.234,567", {
      localeData: nlNLLocaleData
    });

    expect(result).toBe(1234.567);
  });
});
