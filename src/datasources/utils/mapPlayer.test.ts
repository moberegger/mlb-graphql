import type { APIPlayer, Player } from "../SportRadarAPI";

import mapPlayer from "./mapPlayer.js";

describe("mapPlayer()", () => {
  it("maps to a player", () => {
    const input: APIPlayer = {
      id: "abc",
      full_name: "Ball Player",
      position: "P",
      primary_position: "SP",
      pro_debut: "2006-06-10",
    };

    const output: Player = {
      id: "abc",
      name: "Ball Player",
      position: "PITCHER",
      primaryPosition: "STARTING_PITCHER",
      proDebut: "2006-06-10",
    };

    expect(mapPlayer(input)).toEqual(output);
  });
});
