const enUSLocaleData = require("intl-data/locale-data/json/en-US");
const nlNLLocaleData = require("intl-data/locale-data/json/nl-NL");

const parseMoney = require("./parseMoney");
const parseNumber = require("./parseNumber");

jest.mock("./parseNumber");

describe("parseMoney", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("ISO input", () => {
    parseNumber.mockReturnValue(295);

    const result = parseMoney("EUR 295", {
      localeData: enUSLocaleData
    });

    expect(result).toEqual({
      amount: 295,
      currency: "EUR"
    });
    expect(parseNumber.mock.calls.length).toBe(1);
    expect(parseNumber.mock.calls[0][1].localeData).toBe(enUSLocaleData);
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
    expect(parseNumber.mock.calls.length).toBe(1);
    expect(parseNumber.mock.calls[0][1].localeData).toBe(enUSLocaleData);
  });

  test("Unknown local currency symbol based input", () => {
    parseNumber.mockReturnValue(295);

    const result = parseMoney("$295", {
      localeData: nlNLLocaleData
    });

    expect(result).toEqual({
      amount: 295
    });
    expect(parseNumber.mock.calls.length).toBe(1);
    expect(parseNumber.mock.calls[0][1].localeData).toBe(nlNLLocaleData);
  });

  test("Nonsense input", () => {
    parseNumber.mockReturnValue(undefined);

    const result = parseMoney("nonsense", {
      localeData: enUSLocaleData
    });

    expect(result).toBeUndefined();
    expect(parseNumber.mock.calls.length).toBe(1);
    expect(parseNumber.mock.calls[0][1].localeData).toBe(enUSLocaleData);
  });

  test("Input without currency", () => {
    parseNumber.mockReturnValue(100);

    const result = parseMoney("100", {
      localeData: enUSLocaleData
    });

    expect(result).toEqual({
      amount: 100
    });
    expect(parseNumber.mock.calls.length).toBe(1);
    expect(parseNumber.mock.calls[0][1].localeData).toBe(enUSLocaleData);
  });
});
