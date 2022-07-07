import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const DIR_NAME = path.dirname(url.fileURLToPath(import.meta.url));

export default async function loadFile(fileName: string) {
  if (path.extname(fileName) !== ".ts")
    return fs.readFile(fileName, { encoding: "utf-8" });

  const src = await import(path.relative(DIR_NAME, fileName));
  return src.default ? src.default : src;
}
