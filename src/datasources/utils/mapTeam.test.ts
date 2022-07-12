import type { APITeam, Team } from "../SportRadarAPI";

import mapTeam from "./mapTeam.js";

describe("mapTeam()", () => {
  it("maps to a team", () => {
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

  it("returns undefined if no input provided", () => {
    expect(mapTeam()).toBeUndefined();
  });
});
