import { round } from "lodash-es";

/**
 * Calculates batting average: (H / AB)
 *
 * @param h Number of hits by the player
 * @param ab Number of at bats by the player
 * @returns The calculated batting average
 */
export default ({ h, ab }: { h: number; ab: number }) => {
  // TODO: Validate if provided more hits than at bats
  if (ab === 0) return (0).toFixed(3);

  return round(h / ab, 3).toFixed(3);
};
