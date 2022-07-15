import { memoize } from "lodash-es";

import hashArgs from "./hashArgs.js";

type GenericFn = (...args: any) => any;

export default <Fn extends GenericFn>(fn: Fn) => memoize<Fn>(fn, hashArgs);
