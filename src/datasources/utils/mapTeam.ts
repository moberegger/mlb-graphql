import type { APITeam, Team } from "../SportRadarAPI";

export default ({ abbr, ...team }: APITeam): Team => ({
  abbreviation: abbr,
  ...team,
});
