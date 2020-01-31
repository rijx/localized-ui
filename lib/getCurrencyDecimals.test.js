const getCurrencyDecimals = require("./getCurrencyDecimals");

jest.mock("../data/ISO4217_decimals", () => {
  return {
    0: "JPY",
    2: "USD,EUR"
  };
});

describe("getCurrencyDecimals", () => {
  test("test", () => {
    expect(getCurrencyDecimals("JPY")).toBe(0);
    expect(getCurrencyDecimals("USD")).toBe(2);
    expect(getCurrencyDecimals("EUR")).toBe(2);
  });

  test("Unmapped currency codes result in undefined", () => {
    expect(getCurrencyDecimals("ABC")).toBeUndefined();
  });
});
