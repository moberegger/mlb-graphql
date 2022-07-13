import type { APIPlayer, Player } from "../SportRadarAPI";

import mapPosition from "./mapPosition.js";
import mapPrimaryPosition from "./mapPrimaryPosition.js";
import mapTeam from "./mapTeam.js";

export default ({
  full_name,
  position,
  primary_position,
  pro_debut,
  team,
  ...player
}: APIPlayer): Player => ({
  name: full_name,
  position: mapPosition(position),
  primaryPosition: mapPrimaryPosition(primary_position),
  proDebut: pro_debut,
  team: mapTeam(team),
  ...player,
});
