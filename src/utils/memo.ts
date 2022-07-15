import { memoize } from "lodash-es";

import hashArgs from "./hashArgs.js";

export default (fn: (...args: any) => any) => memoize(fn, hashArgs);
