import mapPosition from "./mapPosition";

describe("mapPosition()", () => {
  it("maps to a position", () => {
    expect(mapPosition("P")).toBe("PITCHER");
  });
});
