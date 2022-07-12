import type { APITeam, Team } from "../SportRadarAPI";

export default (apiTeam?: APITeam): Team | undefined => {
  if (!apiTeam) return undefined;

  const { abbr, ...team } = apiTeam;

  return { abbreviation: abbr, ...team };
};
