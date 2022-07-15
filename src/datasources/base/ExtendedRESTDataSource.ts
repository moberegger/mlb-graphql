import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { HttpsAgent } from "agentkeepalive";
import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import type {
  RequestInfo,
  RequestInit,
  URLSearchParamsInit,
} from "apollo-server-env";
import { retry, handleWhenResult, ExponentialBackoff } from "cockatiel";
import fetch, { Request, Response } from "node-fetch";

import emitter from "../../core/emitter.js";

const keepaliveAgent = new HttpsAgent();

emitter.on("shutdown", () => keepaliveAgent.destroy());

export default class ExtendedRESTDataSource extends RESTDataSource<undefined> {
  constructor(httpFetch: typeof fetch = fetch) {
    const fetchWithRetry = (req: RequestInfo) => {
      const request = req as Request;
      request.agent = keepaliveAgent;

      return retry(
        handleWhenResult((resp) => (resp as Response).status === 403),
        { maxAttempts: 3, backoff: new ExponentialBackoff() }
      ).execute(() => httpFetch(request));
    };

    super(fetchWithRetry);

    this.initialize({ cache: new InMemoryLRUCache(), context: undefined });
  }

  override async get<TResult = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<TResult>;

  override async get<TResult>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<TResult | null> {
    try {
      return await super.get<TResult>(path, params, init);
    } catch (error) {
      if (
        error instanceof ApolloError &&
        error.extensions?.["response"]?.status === 404
      )
        return null;

      throw error;
    }
  }
}
