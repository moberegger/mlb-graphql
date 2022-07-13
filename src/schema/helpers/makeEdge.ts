import type { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";

export default <TSource = any, TContext = any, TArgs = any, TResult = unknown>(
    resolver: GraphQLFieldResolver<TSource, TContext, TArgs, TResult>
  ) =>
  async (
    root: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ) => ({
    root,
    node: await resolver(root, args, context, info),
  });
