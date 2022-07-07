import { globby } from "globby";

import loadFile from "./loadFile.js";

export default async function loadFiles(glob: string): Promise<any[]> {
  const fileNames = await globby(glob);

  return Promise.all(fileNames.map(loadFile));
}
