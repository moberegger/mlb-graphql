import mapThrowHand from "./mapThrowHand";

describe("mapThrowHand()", () => {
  it("maps to a throw hand", () => {
    expect(mapThrowHand("R")).toBe("RIGHT");
  });
});
