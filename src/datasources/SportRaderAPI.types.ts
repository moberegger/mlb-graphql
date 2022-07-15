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

export interface Season extends APISeason {}

export interface APISeason {
  id: string;
  year: number;
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
