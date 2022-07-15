import hashArgs from "./hashArgs.js";

describe("hashArgs", () => {
  it("hashes arguments", () => {
    const result = hashArgs(
      1,
      "abc",
      { testing: "123" },
      new Date(1985, 8, 20),
      [1, "abc"]
    );

    expect(result).toBeString();
  });
});
