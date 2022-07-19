import battingAvg from "./calculateAvg.js";

describe("calculateAvg()", () => {
  it("calculates batting average", () => {
    expect(battingAvg({ h: 0, ab: 0 })).toBe("0.000");
    expect(battingAvg({ h: 5, ab: 10 })).toBe("0.500");
    expect(battingAvg({ h: 10, ab: 10 })).toBe("1.000");
  });
});
