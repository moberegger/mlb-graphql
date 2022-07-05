import url from "./url.js";

describe("url", () => {
  it("encodes url string", () => {
    const dubiousId = "/admin";

    expect(url`/foo/${dubiousId}/profile`).toBe("/foo/%2Fadmin/profile");
  });
});
