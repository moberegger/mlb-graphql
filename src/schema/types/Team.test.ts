import { gql } from "apollo-server";

import * as factories from "../../datasources/factories/index.js";
import server from "../../server.js";

describe("Team type", () => {
  describe("on Player", () => {
    describe("currentTeam", () => {
      describe("when player is currently on a team", () => {
        it("returns a team", async () => {
          const player = factories.player.build();

          const { data, errors } = await server.executeOperation({
            query: gql`
              query ($id: ID!) {
                player(id: $id) {
                  currentTeam {
                    node {
                      id
                      name
                      market
                      abbreviation
                    }
                  }
                }
              }
            `,
            variables: { id: player.id },
          });

          expect(errors).toBeUndefined();
          expect(data!.player.currentTeam.node).toEqual(player.team);
        });
      });

      describe("when player is not currently on a team", () => {
        it("returns null", async () => {
          const player = factories.player.build({ team: undefined });

          const { data, errors } = await server.executeOperation({
            query: gql`
              query ($id: ID!) {
                player(id: $id) {
                  currentTeam {
                    node {
                      id
                      name
                      market
                      abbreviation
                    }
                  }
                }
              }
            `,
            variables: { id: player.id },
          });

          expect(errors).toBeUndefined();
          expect(data!.player.currentTeam.node).toBeNull();
        });
      });
    });
  });

  describe("on Query", () => {
    it("returns a team", async () => {
      const team = factories.team.build();

      const { data, errors } = await server.executeOperation({
        query: gql`
          query ($id: ID!) {
            team(id: $id) {
              id
              name
              market
              abbreviation
            }
          }
        `,
        variables: { id: team.id },
      });

      expect(errors).toBeUndefined();
      expect(data!["team"]).toEqual(team);
    });

    it("returns null", async () => {
      const id = factories.team.buildError();

      const { data, errors } = await server.executeOperation({
        query: gql`
          query ($id: ID!) {
            team(id: $id) {
              id
              name
            }
          }
        `,
        variables: { id },
      });

      expect(errors).toBeUndefined();
      expect(data?.["team"]).toBeNull();
    });
  });
});
