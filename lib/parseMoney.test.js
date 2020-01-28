const enUSLocaleData = require("intl-data/locale-data/json/en-US");

const parseMoney = require("./parseMoney");
const parseNumber = require("./parseNumber");

jest.mock("./parseNumber");

describe("parseMoney", () => {
  test("ISO input", () => {
    parseNumber.mockReturnValue(295);

    const result = parseMoney("EUR 295");

    expect(result).toEqual({
      amount: 295,
      currency: "EUR"
    });
  });

  test("Local currency symbol based input", () => {
    parseNumber.mockReturnValue(295);

    const result = parseMoney("$295", {
      localeData: enUSLocaleData
    });

    expect(result).toEqual({
      amount: 295,
      currency: "USD"
    });
  });

  test("Unknown local currency symbol based input", () => {
    parseNumber.mockReturnValue(295);

    const result = parseMoney("$295");

    // TODO: what makes sense?
    expect(result).toBeUndefined();
  });

  test("Nonsense input", () => {
    parseNumber.mockReturnValue(undefined);

    const result = parseMoney("nonsense", {
      localeData: enUSLocaleData
    });

    expect(result).toBeUndefined();
  });
});
