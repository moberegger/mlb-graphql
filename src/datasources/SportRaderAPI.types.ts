import type { APIPosition, Position } from "./utils/mapPosition.js";
import type {
  APIPrimaryPosition,
  PrimaryPosition,
} from "./utils/mapPrimaryPosition.js";

export { APIPosition, APIPrimaryPosition, Position, PrimaryPosition };

export interface Player {
  id: string;
  name: string;
  position: Position;
  primaryPosition: PrimaryPosition;
  proDebut: string;
  team?: Team;
  seasons?: Season[];
}

export interface APIPlayer {
  id: string;
  full_name: string;
  position: APIPosition;
  primary_position: APIPrimaryPosition;
  pro_debut: string;
  team?: APITeam;
  seasons?: APISeason[];
}

export type SeasonType = "REG" | "PRE" | "PST";

export interface OffensiveStats {
  ab: number;
  rbi: number;
  h: number;
  avg: string;
  // babip: number;
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
          onbase: {
            h: number;
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
