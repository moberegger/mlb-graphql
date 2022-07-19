import { round } from "lodash-es";

/**
 * Calculates batting average of balls in play: (H - HR)/(AB - K - HR + SF)
 *
 * @param h Number of hits by the player
 * @param hr Number of home runs by the player
 * @param ab Number of at bats by the player
 * @param k Number of strike outs by the player
 * @param sf Number of sacrifice flies by the player
 * @returns The calculated batting average of balls in play
 */
export default ({
  h,
  hr,
  ab,
  k,
  sf,
}: {
  h: number;
  hr: number;
  ab: number;
  k: number;
  sf: number;
}) => {
  const bip = ab - k - hr + sf;

  if (bip <= 0) return (0).toFixed(3);

  const babip = (h - hr) / bip;

  return round(babip, 3).toFixed(3);
};
