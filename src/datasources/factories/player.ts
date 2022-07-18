import Chance from "chance";
import { Sync } from "factory.ts";
import format from "date-fns/format";
import nock from "nock";
import { sample } from "lodash-es";

import type { APIPlayer } from "../SportRadarAPI.js";
import { APIPosition, POSITION_MAP } from "../utils/mapPosition.js";
import {
  APIPrimaryPosition,
  PRIMARY_POSITION_MAP,
} from "../utils/mapPrimaryPosition.js";
import mapPlayer from "../utils/mapPlayer.js";
import { APIStatus, STATUS_MAP } from "../utils/mapStatus.js";

const chance = new Chance();

const playerFactory = Sync.makeFactory<APIPlayer>({
  id: Sync.each(() => chance.guid()),
  status: Sync.each(() => sample(Object.keys(STATUS_MAP)) as APIStatus),
  position: Sync.each(() => sample(Object.keys(POSITION_MAP)) as APIPosition),
  primary_position: Sync.each(
    () => sample(Object.keys(PRIMARY_POSITION_MAP)) as APIPrimaryPosition
  ),
  full_name: Sync.each(() => chance.name()),
  jersey_number: Sync.each(() =>
    chance.integer({ min: 1, max: 99 }).toString()
  ),
  height: Sync.each(() => chance.integer({ min: 60, max: 84 }).toString()),
  weight: Sync.each(() => chance.integer({ min: 100, max: 300 }).toString()),
  throw_hand: Sync.each(() => sample(["L", "R", "B"])!),
  bat_hand: Sync.each(() => sample(["L", "R", "B"])!),
  high_school: Sync.each(() => chance.address()),
  birthdate: Sync.each(() => format(chance.date(), "yyyy-MM-dd")),
  birthstate: Sync.each(() => chance.state()),
  birthcountry: Sync.each(() => chance.country()),
  birthcity: Sync.each(() => chance.city()),
  pro_debut: Sync.each(() => format(chance.date(), "yyyy-MM-dd")),
  team: Sync.each(() => ({
    id: chance.guid(),
    name: chance.animal(),
    market: chance.city(),
    abbr: chance.name(),
  })),
});

export default {
  build(player?: Partial<APIPlayer>) {
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
