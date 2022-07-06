import type { APIPlayer, Player } from "../SportRadarAPI";

import mapPlayer from "./mapPlayer.js";

describe("mapPlayer()", () => {
  it("maps to a position", () => {
    const input: APIPlayer = {
      id: "abc",
      full_name: "Ball Player",
      position: "P",
      primary_position: "SP",
    };

    const output: Player = {
      id: "abc",
      name: "Ball Player",
      position: "PITCHER",
      primaryPosition: "STARTING_PITCHER",
    };

    expect(mapPlayer(input)).toEqual(output);
  });
});
