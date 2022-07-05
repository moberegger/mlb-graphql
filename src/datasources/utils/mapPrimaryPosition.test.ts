import mapPrimaryPosition from "./mapPrimaryPosition";

describe("mapPrimaryPosition()", () => {
  it("maps to a position", () => {
    expect(mapPrimaryPosition("C")).toBe("CATCHER");
  });
});
