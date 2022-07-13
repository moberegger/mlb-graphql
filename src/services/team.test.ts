import * as factories from "../datasources/factories/index.js";
import ctx from "../context.js";

describe("Team service", () => {
  describe("findById()", () => {
    it("returns a team", async () => {
      const team = factories.team.build();

      await expect(ctx().services.team.findById(team.id)).resolves.toEqual(
        team
      );
    });

    it("returns null if team doesn't exist", async () => {
      const id = factories.team.buildError();

      await expect(ctx().services.team.findById(id)).resolves.toBeNull();
    });
  });

  describe("findByPlayerId", () => {
    describe("when player is currently on a team", () => {
      it("returns a team", async () => {
        const player = factories.player.build();

        await expect(
          ctx().services.team.findByPlayerId(player.id)
        ).resolves.toEqual(player.team);
      });
    });

    describe("when player is not currently on a team", () => {
      it("returns null", async () => {
        const player = factories.player.build({ team: undefined });

        await expect(
          ctx().services.team.findByPlayerId(player.id)
        ).resolves.toBeNull();
      });
    });

    describe("when no player is found", () => {
      it("returns null", async () => {
        const id = factories.player.buildError();

        await expect(
          ctx().services.team.findByPlayerId(id)
        ).resolves.toBeNull();
      });
    });
  });
});
