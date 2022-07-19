import { round } from "lodash-es";

/**
 * Calculates batting average of balls in play: (H - HR) / BIP
 *
 * @param h Number of hits by the player
 * @param hr Number of home runs by the player
 * @param ab Number of at bats by the player
 * @param k Number of strike outs by the player
 * @param sf Number of sacrifice flies by the player
 * @param bip Number of balls in play by the player
 * @returns The calculated batting average of balls in play
 */

const obp = ({ h, hr, bip }: { h: number; hr: number; bip: number }) => {
  if (bip <= 0) return (0).toFixed(3);

  const babip = (h - hr) / bip;

  return round(babip, 3).toFixed(3);
};

export default function calculateOBP(
  stats:
    | {
        h: number;
        hr: number;
        ab: number;
        k: number;
        sf: number;
      }
    | { h: number; hr: number; bip: number }
) {
  if ("bip" in stats) {
    const { h, hr, bip } = stats;

    return obp({ h, hr, bip });
  }

  const { h, hr, ab, k, sf } = stats;
  const bip = ab - k - hr + sf;

  return obp({ h, hr, bip });
}
