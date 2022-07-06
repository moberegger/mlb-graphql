import { gql } from "apollo-server";
import nock from "nock";

import server from "../../server.js";

nock.disableNetConnect();

describe("Player type", () => {
  describe("on Query", () => {
    it("returns a player", async () => {
      const id = "abc";
      nock("https://api.sportradar.us")
        .get(`/mlb/trial/v7/en/players/${id}/profile.json`)
        .query({ api_key: "" })
        .reply(200, {
          player: {
            id,
            position: "P",
            primary_position: "SP",
            full_name: "Jon Lester",
          },
        });

      const { data, errors } = await server.executeOperation({
        query: gql`
          query ($id: ID!) {
            player(id: $id) {
              id
              name
              position
              primaryPosition
            }
          }
        `,
        variables: { id },
      });

      expect(errors).toBeUndefined();
      expect(data?.["player"]).toEqual({
        id,
        position: "PITCHER",
        primaryPosition: "STARTING_PITCHER",
        name: "Jon Lester",
      });
    });

    it("returns null", async () => {
      const id = "abc";
      nock("https://api.sportradar.us")
        .get(`/mlb/trial/v7/en/players/${id}/profile.json`)
        .query({ api_key: "" })
        .reply(404);

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
