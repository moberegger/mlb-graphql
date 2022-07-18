import battingAvg from "./battingAvg.js";

describe("battingAvg()", () => {
  it("calculates batting average", () => {
    expect(battingAvg(0, 0)).toBe("0.000");
    expect(battingAvg(5, 10)).toBe("0.500");
    expect(battingAvg(10, 10)).toBe("1.000");
  });
});
