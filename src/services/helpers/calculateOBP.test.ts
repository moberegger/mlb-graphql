import calculateOBP from "./calculateOBP.js";

describe("calculateOBP()", () => {
  it("calculates on base percentage", () => {
    expect(calculateOBP({ h: 0, bb: 0, hbp: 0, ab: 40, sf: 10 })).toBe("0.000");
    expect(calculateOBP({ h: 30, bb: 10, hbp: 5, ab: 70, sf: 5 })).toBe(
      "0.500"
    );
    expect(calculateOBP({ h: 30, bb: 10, hbp: 5, ab: 25, sf: 5 })).toBe(
      "1.000"
    );
  });

  it("guards against invalid denominator", () => {
    expect(calculateOBP({ h: 10, bb: 0, hbp: 0, ab: 0, sf: 0 })).toBe("0.000");
  });
});
