import { round } from "lodash-es";

export default (hits: number, ab: number) => {
  if (ab === 0) return (0).toFixed(3);

  return round(hits / ab, 3).toFixed(3);
};
