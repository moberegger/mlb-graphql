export const THROWS_MAP = {
  B: "BOTH",
  L: "LEFT",
  R: "RIGHT",
} as const;

export type APIThrowHand = keyof typeof THROWS_MAP;
export type ThrowHand = typeof THROWS_MAP[APIThrowHand];

export default (throwHand: APIThrowHand) => THROWS_MAP[throwHand];
