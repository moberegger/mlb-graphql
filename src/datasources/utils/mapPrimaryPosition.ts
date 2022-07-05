const PRIMARY_POSITION_MAP = {
  C: "CATCHER",
  CF: "CENTER_FIELD",
  "1B": "FIRST_BASE",
  LF: "LEFT_FIELD",
  RF: "RIGHT_FIELD",
  RP: "RELIEF_PITCHER",
  "2B": "SECOND_BASE",
  SS: "SHORTSTOP",
  SP: "STARTING_PITCHER",
  "3B": "THIRD_BASE",
};

export type PrimaryPosition = keyof typeof PRIMARY_POSITION_MAP;

export default (position: PrimaryPosition): Uppercase<string> =>
  PRIMARY_POSITION_MAP[position];
