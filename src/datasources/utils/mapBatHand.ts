export const BATS_MAP = {
  B: "SWITCH",
  L: "LEFT",
  R: "RIGHT",
} as const;

export type APIBatHand = keyof typeof BATS_MAP;
export type BatHand = typeof BATS_MAP[APIBatHand];

export default (batHand: APIBatHand) => BATS_MAP[batHand];
