import type { APIPlayer, Player } from "../SportRadarAPI";
import mapBatHand from "./mapBatHand.js";

import mapPosition from "./mapPosition.js";
import mapPrimaryPosition from "./mapPrimaryPosition.js";
import mapPlayerSeason from "./mapPlayerSeason.js";
import mapStatus from "./mapStatus.js";
import mapTeam from "./mapTeam.js";
import mapThrowHand from "./mapThrowHand.js";
import toHomeTown from "./toHomeTown.js";

export default ({
  status,
  position,
  primary_position,
  full_name,
  jersey_number,
  height,
  weight,
  throw_hand,
  bat_hand,
  high_school,
  birthdate,
  birthstate,
  birthcountry,
  birthcity,
  pro_debut,
  team,
  seasons,
  ...player
}: APIPlayer): Player => ({
  status: mapStatus(status),
  position: mapPosition(position),
  primaryPosition: mapPrimaryPosition(primary_position),
  name: full_name,
  jerseyNumber: parseInt(jersey_number, 10),
  height: parseInt(height, 10),
  weight: parseInt(weight, 10),
  throws: mapThrowHand(throw_hand),
  bats: mapBatHand(bat_hand),
  highSchool: high_school,
  birthDate: birthdate,
  homeTown: toHomeTown(birthstate, birthcountry, birthcity),
  proDebut: pro_debut,
  team: mapTeam(team),
  seasons: seasons?.map(mapPlayerSeason),
  ...player,
});
