const parsePercentage = require("./parsePercentage");

describe("parsePercentage", () => {
  test("21%", () => {
    const result = parsePercentage("21%", {
      localeData: {
        number: {
          symbols: {
            latn: {
              percentSign: "%"
            }
          }
        }
      }
    });

    expect(result).toBe(0.21);
  });

  test("202.45%", () => {
    const result = parsePercentage("202.45%", {
      localeData: {
        number: {
          symbols: {
            latn: {
              percentSign: "%"
            }
          }
        }
      }
    });

    expect(result).toBe(2.0245);
  });

  test("123 (no percent sign)", () => {
    const result = parsePercentage("123", {
      localeData: {
        number: {
          symbols: {
            latn: {
              percentSign: "%"
            }
          }
        }
      }
    });

    expect(result).toBe(1.23);
  });
});
