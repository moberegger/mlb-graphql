import type { AppContext, ServiceFn } from "../context.js";

const service = ({ services }: AppContext) => {
  const findAllPlayerId = async (id: string) =>
    (await services.player.findById(id))?.seasons || [];

  return { findAllPlayerId };
};

export default service as ServiceFn<ReturnType<typeof service>>;
