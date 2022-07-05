const POSITION_MAP = {
  C: "CATCHER",
  IF: "INFIELDER",
  OF: "OUTFIELDER",
  P: "PITCHER",
};

export type Position = keyof typeof POSITION_MAP;

export default (position: Position): Uppercase<string> =>
  POSITION_MAP[position];
