import type { APIBatHand, BatHand } from "./utils/mapBatHand.js";
import type { APIPosition, Position } from "./utils/mapPosition.js";
import type {
  APIPrimaryPosition,
  PrimaryPosition,
} from "./utils/mapPrimaryPosition.js";
import type { APIStatus, Status } from "./utils/mapStatus.js";
import type { APIThrowHand, ThrowHand } from "./utils/mapThrowHand.js";

export { APIPosition, APIPrimaryPosition, Position, PrimaryPosition };

export interface Player {
  id: string;
  status: Status;
  position: Position;
  primaryPosition: PrimaryPosition;
  name: string;
  jerseyNumber: number;
  height: number;
  weight: number;
  throws: ThrowHand;
  bats: BatHand;
  highSchool: string;
  birthDate: string;
  homeTown: string;
  proDebut: string;
  team?: Team;
  seasons?: Season[];
}

export interface APIPlayer {
  id: string;
  status: APIStatus;
  position: APIPosition;
  primary_position: APIPrimaryPosition;
  full_name: string;
  jersey_number: string;
  height: string;
  weight: string;
  throw_hand: APIThrowHand;
  bat_hand: APIBatHand;
  high_school: string;
  birthdate: string;
  birthstate: string;
  birthcountry: string;
  birthcity: string;
  pro_debut: string;
  team?: APITeam;
  seasons?: APISeason[];
}

export type SeasonType = "REG" | "PRE" | "PST";

export interface OffensiveStats {
  ab: number;
  rbi: number;
  h: number;
  hr: number;
  k: number;
  sf: number;
  avg: string;
  babip: string;

  // iso: number;
  // obp: number;
  // ops: number;
  // slg: number;
  // xbh: number;
  // avg: number;
}

export interface Season extends Omit<APISeason, "totals"> {
  offensiveStats: OffensiveStats;
}

export interface APISeason {
  id: string;
  year: number;
  type: SeasonType;
  // Stats
  totals: {
    statistics: {
      hitting: {
        overall: {
          ab: number;
          rbi: number;
          avg: string;
          babip: number;
          onbase: {
            hr: number;
            h: number;
          };
          outs: {
            ktotal: number;
            sacfly: number;
          };
        };
      };
    };
  };
}

export interface Team {
  id: string;
  name: string;
  market: string;
  abbreviation: Uppercase<string>;
}

export interface APITeam {
  id: string;
  name: string;
  market: string;
  abbr: Uppercase<string>;
}
