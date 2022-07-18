export const STATUS_MAP = {
  A: "ACTIVE",
  D10: "IL_10",
  D15: "IL_15",
  D60: "IL_60",
  MIN: "MINOR",
  RET: "RETIRED",
} as const;

export type APIStatus = keyof typeof STATUS_MAP;
export type Status = typeof STATUS_MAP[APIStatus];

export default (status: APIStatus) => STATUS_MAP[status];
