import type { ServiceContext } from "../context.js";

export default ({ ds }: ServiceContext) => {
  const findById = (id: string) => ds.sportsRadarApi.getPlayer(id);

  return { findById };
};
