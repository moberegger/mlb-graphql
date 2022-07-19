import { round } from "lodash-es";

/**
 * Calculates on base percentage: (H + BB + HBP) / (AB + BB + HBP + SF)
 *
 * @param h Number of hits by the player
 * @param bb Number of walks by the player
 * @param hbp Number of hit by pitchers by the player
 * @param ab Number of at bats by the player
 * @param sf Number of sacrifice flies by the player
 * @returns The calculated batting average of balls in play
 */
export default ({
  h,
  bb,
  hbp,
  ab,
  sf,
}: {
  h: number;
  bb: number;
  hbp: number;
  ab: number;
  sf: number;
}) => {
  const pa = ab + bb + hbp + sf;

  if (pa <= 0) return (0).toFixed(3);

  const obp = (h + bb + hbp) / pa;

  return round(obp, 3).toFixed(3);
};
