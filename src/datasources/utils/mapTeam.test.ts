import type { APITeam, Team } from "../SportRadarAPI";

import mapTeam from "./mapTeam.js";

describe("mapTeam()", () => {
  it("maps to a position", () => {
    const input: APITeam = {
      id: "abc",
      name: "Blue Jays",
      market: "Toronto",
      abbr: "TOR",
    };

    const output: Team = {
      id: "abc",
      name: "Blue Jays",
      market: "Toronto",
      abbreviation: "TOR",
    };

    expect(mapTeam(input)).toEqual(output);
  });
});
