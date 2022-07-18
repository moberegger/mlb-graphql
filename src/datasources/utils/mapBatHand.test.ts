import mapBatHand from "./mapBatHand";

describe("mapBatHand()", () => {
  it("maps to a bat hand", () => {
    expect(mapBatHand("R")).toBe("RIGHT");
  });
});
