import * as factories from "../datasources/factories/index.js";
import ctx from "../context.js";

describe("Player service", () => {
  describe("findById()", () => {
    it("returns a player", async () => {
      const player = factories.player.build();

      await expect(ctx().services.player.findById(player.id)).resolves.toEqual(
        player
      );
    });

    it("returns null if player doesn't exist", async () => {
      const id = factories.player.buildError();

      await expect(ctx().services.player.findById(id)).resolves.toBeNull();
    });
  });
});
