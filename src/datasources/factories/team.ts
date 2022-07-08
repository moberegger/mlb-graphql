import Chance from "chance";
import { Sync } from "factory.ts";
import nock from "nock";

import type { APITeam } from "../SportRadarAPI.js";
import mapTeam from "../utils/mapTeam.js";

const chance = new Chance();

const teamFactory = Sync.makeFactory<APITeam>({
  id: Sync.each(() => chance.guid()),
  name: Sync.each(() => chance.animal()),
  market: Sync.each(() => chance.city()),
  abbr: Sync.each(() => chance.name()),
}).withDerivation("abbr", (team) => team.market.substring(0, 3).toUpperCase());

export default {
  build(team?: APITeam) {
    const generatedTeam = teamFactory.build(team);
    const { id } = generatedTeam;

    nock("https://api.sportradar.us")
      .get(`/mlb/trial/v7/en/teams/${id}/profile.json`)
      .query({ api_key: "" })
      .reply(200, generatedTeam);

    return mapTeam(generatedTeam);
  },

  buildError(code = 404) {
    const id = chance.guid();

    nock("https://api.sportradar.us")
      .get(`/mlb/trial/v7/en/teams/${id}/profile.json`)
      .query({ api_key: "" })
      .reply(code);

    return id;
  },
};
