import { pathToFileURL } from "node:url";

// These files are also imported by the test runner. Only a direct `node file.mjs`
// invocation should write dist/, copy logos, or exit the process.
export function ranAsScript(metaUrl) {
  const entry = process.argv[1];
  if (!entry) return false;
  return metaUrl === pathToFileURL(entry).href;
}
