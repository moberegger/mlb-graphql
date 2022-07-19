import calculateBABIP from "./calculateBABIP.js";

describe("calculateBABIP()", () => {
  describe("when given bip", () => {
    it("calculates batting average of balls in play", () => {
      expect(calculateBABIP({ h: 10, hr: 10, bip: 10 })).toBe("0.000");
      expect(calculateBABIP({ h: 30, hr: 10, bip: 40 })).toBe("0.500");
      expect(calculateBABIP({ h: 30, hr: 10, bip: 20 })).toBe("1.000");
    });

    it("guards against invalid denominator", () => {
      expect(calculateBABIP({ h: 30, hr: 10, bip: 0 })).toBe("0.000");
    });
  });

  describe("when calculating bip", () => {
    it("calculates batting average of balls in play", () => {
      expect(calculateBABIP({ h: 10, hr: 10, ab: 40, k: 5, sf: 5 })).toBe(
        "0.000"
      );
      expect(calculateBABIP({ h: 30, hr: 10, ab: 40, k: 10, sf: 20 })).toBe(
        "0.500"
      );
      expect(calculateBABIP({ h: 30, hr: 10, ab: 40, k: 10, sf: 0 })).toBe(
        "1.000"
      );
    });

    it("guards against invalid denominator", () => {
      expect(calculateBABIP({ h: 30, hr: 10, ab: 0, k: 0, sf: 0 })).toBe(
        "0.000"
      );
      expect(calculateBABIP({ h: 30, hr: 5, ab: 10, k: 10, sf: 5 })).toBe(
        "0.000"
      );
      expect(calculateBABIP({ h: 30, hr: 5, ab: 10, k: 10, sf: 0 })).toBe(
        "0.000"
      );
    });
  });
});
