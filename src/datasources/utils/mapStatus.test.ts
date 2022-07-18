import mapStatus from "./mapStatus";

describe("mapStatus()", () => {
  it("maps to a status", () => {
    expect(mapStatus("A")).toBe("ACTIVE");
  });
});
