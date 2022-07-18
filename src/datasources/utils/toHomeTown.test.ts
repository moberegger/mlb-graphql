import toHomeTown from "./toHomeTown";

describe("toHomeTown()", () => {
  it("returns friendly city name", () => {
    expect(toHomeTown("ON", "CAN", "Mississauga")).toBe("Mississauga, ON, CAN");
  });
});
