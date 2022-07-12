import { gql } from "apollo-server";
import omit from "lodash/omit";

import * as factories from "../../datasources/factories/index.js";
import server from "../../server.js";

describe("Player type", () => {
  describe("on Query", () => {
    it("returns a player", async () => {
      const player = factories.player.build();

      const { data, errors } = await server.executeOperation({
        query: gql`
          query ($id: ID!) {
            player(id: $id) {
              id
              name
              position
              primaryPosition
              proDebut
            }
          }
        `,
        variables: { id: player.id },
      });

      expect(errors).toBeUndefined();
      expect(data!["player"]).toEqual(omit(player, ["team"]));
    });

    it("returns null", async () => {
      const id = factories.player.buildError();

      const { data, errors } = await server.executeOperation({
        query: gql`
          query ($id: ID!) {
            player(id: $id) {
              id
              name
            }
          }
        `,
        variables: { id },
      });

      expect(errors).toBeUndefined();
      expect(data?.["player"]).toBeNull();
    });
  });
});
