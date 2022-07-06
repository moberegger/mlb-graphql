import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import type { RequestInit, URLSearchParamsInit } from "apollo-server-env";

export default class ExtendedRESTDataSource<
  TContext = any
> extends RESTDataSource<TContext> {
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
