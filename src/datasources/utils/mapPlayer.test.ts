import type { APIPlayer, Player } from "../SportRadarAPI";

import mapPlayer from "./mapPlayer.js";

describe("mapPlayer()", () => {
  it("maps to a player", () => {
    const input: APIPlayer = {
      id: "abc",
      status: "A",
      position: "P",
      primary_position: "SP",
      full_name: "Ball Player",
      jersey_number: "1",
      height: "70",
      weight: "200",
      throw_hand: "L",
      bat_hand: "R",
      high_school: "Meadowvale Secondary",
      birthdate: "1985-09-20",
      birthstate: "ON",
      birthcountry: "CAN",
      birthcity: "Mississauga",
      pro_debut: "2006-06-10",
    };

    const output: Player = {
      id: "abc",
      status: "ACTIVE",
      position: "PITCHER",
      primaryPosition: "STARTING_PITCHER",
      name: "Ball Player",
      jerseyNumber: 1,
      height: 70,
      weight: 200,
      throws: "LEFT",
      bats: "RIGHT",
      highSchool: "Meadowvale Secondary",
      birthDate: "1985-09-20",
      homeTown: "Mississauga, ON, CAN",
      proDebut: "2006-06-10",
    };

    expect(mapPlayer(input)).toEqual(output);
  });
});
