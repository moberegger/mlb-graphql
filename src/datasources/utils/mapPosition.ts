export const POSITION_MAP = {
  C: "CATCHER",
  IF: "INFIELDER",
  OF: "OUTFIELDER",
  P: "PITCHER",
} as const;

export type APIPosition = keyof typeof POSITION_MAP;
export type Position = typeof POSITION_MAP[APIPosition];

export default (position: APIPosition) => POSITION_MAP[position];
