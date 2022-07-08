import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import type {
  RequestInfo,
  RequestInit,
  URLSearchParamsInit,
} from "apollo-server-env";
import { retry, handleWhenResult, ExponentialBackoff } from "cockatiel";
import fetch, { Request, Response } from "node-fetch";

export default class ExtendedRESTDataSource<
  TContext = any
> extends RESTDataSource<TContext> {
  constructor(httpFetch: typeof fetch = fetch) {
    const fetchWithRetry = (req: RequestInfo) =>
      retry(
        handleWhenResult((resp) => (resp as Response).status === 403),
        { maxAttempts: 3, backoff: new ExponentialBackoff() }
      ).execute(() => httpFetch(req as Request));

    super(fetchWithRetry);
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
