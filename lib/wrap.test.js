const translate = require("./translate");
const wrap = require("./wrap");

jest.mock("./translate");

describe("Wrap", () => {
  test("working", () => {
    const wrapper = wrap({
      localeData: true
    });

    translate.mockReturnValue("test");

    const result = wrapper.translate("arg1", "arg2");

    expect(translate.mock.calls.length).toBe(1);
    expect(translate.mock.calls[0]).toEqual([
      "arg1",
      "arg2",
      {
        localeData: true
      }
    ]);
    expect(result).toBe("test");
  });

  test("Avoid accidentally using localeData as baseConfig", () => {
    try {
      wrap({
        irrelevantStuff: true
      });

      throw new Error("Expected to enter catch block");
    } catch (err) {
      expect(err.message).toBe("Missing baseConfig.localeData");
    }
  });
});
