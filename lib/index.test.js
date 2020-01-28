const fs = require("mz/fs");
const functions = require(".");

describe("Index", () => {
  test("is everything included", async () => {
    const files = await fs.readdir(__dirname);

    const expectedKeys = files
      .filter(
        x => x.endsWith(".js") && !x.endsWith(".test.js") && x != "index.js"
      )
      .map(x => x.slice(0, -3));

    expect(Object.keys(functions)).toEqual(expectedKeys);
  });
});
