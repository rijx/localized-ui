const translate = require("./translate");

describe("Translate", () => {
  test("Literal translations", () => {
    const result = translate("hello", null, {
      translations: {
        hello: "hallo"
      }
    });

    expect(result).toBe("hallo");
  });

  test("Case awareness", () => {
    const result = translate("Hello", null, {
      translations: {
        hello: "hallo"
      }
    });

    expect(result).toBe("Hallo");
  });

  test("Variables", () => {
    const result = translate(
      "hello {{name}}",
      {
        name: "Jest"
      },
      {
        translations: {
          "hello {{name}}": "hallo {{name}}"
        }
      }
    );

    expect(result).toBe("hallo Jest");
  });

  test("Variables with case awareness", () => {
    const result = translate(
      "hello {{NAME}}",
      {
        name: "Jest"
      },
      {
        translations: {
          "hello {{name}}": "hallo {{name}}"
        }
      }
    );

    expect(result).toBe("hallo JEST");
  });

  test("Variables with custom key", () => {
    const result = translate(
      "custom_key",
      {
        name: "Jest"
      },
      {
        translations: {
          custom_key: "hallo {{name}}"
        }
      }
    );

    expect(result).toBe("hallo Jest");
  });

  test("Non existing keys", () => {
    try {
      translate(
        "hello",
        {},
        {
          translations: {}
        }
      );

      throw new Error("Expected to enter catch block");
    } catch (err) {
      expect(err.message).toBe("Translation key not found: hello");
    }
  });
});
