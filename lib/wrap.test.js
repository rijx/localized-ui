const translate = require("./translate");
const wrap = require("./wrap");

jest.mock("./translate");

describe("Wrap", () => {
  test("x", () => {
    const wrapper = wrap({
      baseConfig: true
    });

    translate.mockReturnValue("test");

    const result = wrapper.translate("arg1", "arg2");

    expect(translate.mock.calls.length).toBe(1);
    expect(translate.mock.calls[0]).toEqual([
      "arg1",
      "arg2",
      {
        baseConfig: true
      }
    ]);
    expect(result).toBe("test");
  });
});
