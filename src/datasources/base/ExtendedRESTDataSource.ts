import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import {
  Headers as DSHeaders,
  Request as DSRequest,
  RequestInfo,
  RequestInit,
  Response as DSResponse,
  URLSearchParamsInit,
} from "apollo-server-env";
import { retry, handleWhenResult, ExponentialBackoff } from "cockatiel";

const fetchShim = async (req: DSRequest) => {
  const request = new Request(req.url.toString(), {
    ...req,
    headers: Object.keys(req.headers).reduce(
      (headers, [key, value]) => ({
        ...headers,
        [key!]: value,
      }),
      {}
    ),
  });

  const res = await fetch(request);

  return new DSResponse(await res.text(), {
    ...res,
    headers: new DSHeaders(
      Object.keys(res.headers).reduce(
        (headers, [key, value]) => ({
          ...headers,
          [key!]: value,
        }),
        {}
      )
    ),
  });
};

export default class ExtendedRESTDataSource<
  TContext = any
> extends RESTDataSource<TContext> {
  constructor() {
    const fetchWithRetry = (req: RequestInfo) =>
      retry(
        handleWhenResult((resp) => (resp as Response).status === 403),
        { maxAttempts: 5, backoff: new ExponentialBackoff() }
      ).execute(() => {
        console.info("Attempting fetch of", (req as DSRequest).url.toString());
        return fetchShim(req as DSRequest);
      });

    super(fetchWithRetry);
  }

  override didEncounterError(error: Error, request: DSRequest) {
    console.error(error);
    super.didEncounterError(error, request);
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
