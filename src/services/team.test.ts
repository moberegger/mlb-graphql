import * as factories from "../datasources/factories/index.js";
import context from "../context.js";

describe("Team service", () => {
  describe("findById()", () => {
    it("returns a team", async () => {
      const team = factories.team.build();

      await expect(context().services.team.findById(team.id)).resolves.toEqual(
        team
      );
    });

    it("returns null if team doesn't exist", async () => {
      const id = factories.team.buildError();

      await expect(context().services.team.findById(id)).resolves.toBeNull();
    });
  });
});
