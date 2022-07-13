import Chance from "chance";
import { Sync } from "factory.ts";
import format from "date-fns/format";
import nock from "nock";
import sample from "lodash/fp/sample";

import type { APIPlayer } from "../SportRadarAPI.js";
import { APIPosition, POSITION_MAP } from "../utils/mapPosition.js";
import {
  APIPrimaryPosition,
  PRIMARY_POSITION_MAP,
} from "../utils/mapPrimaryPosition.js";
import mapPlayer from "../utils/mapPlayer.js";

const chance = new Chance();

const playerFactory = Sync.makeFactory<APIPlayer>({
  id: Sync.each(() => chance.guid()),
  full_name: Sync.each(() => chance.name()),
  position: Sync.each(() => sample(Object.keys(POSITION_MAP)) as APIPosition),
  primary_position: Sync.each(
    () => sample(Object.keys(PRIMARY_POSITION_MAP)) as APIPrimaryPosition
  ),
  pro_debut: Sync.each(() => format(chance.date(), "yyyy-MM-dd")),
  team: Sync.each(() => ({
    id: chance.guid(),
    name: chance.animal(),
    market: chance.city(),
    abbr: chance.name(),
  })),
});

export default {
  build(player?: APIPlayer) {
    const generatedPlayer = playerFactory.build(player);
    const { id } = generatedPlayer;

    nock("https://api.sportradar.us")
      .get(`/mlb/trial/v7/en/players/${id}/profile.json`)
      .query({ api_key: "" })
      .reply(200, { player: generatedPlayer });

    return mapPlayer(generatedPlayer);
  },

  buildError(code = 404) {
    const id = chance.guid();

    nock("https://api.sportradar.us")
      .get(`/mlb/trial/v7/en/players/${id}/profile.json`)
      .query({ api_key: "" })
      .reply(code);

    return id;
  },
};
