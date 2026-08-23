/**
 * JSON API dispatcher for `/api/v1/*`.
 *
 * `vercel.json` rewrites every `/api/v1/...` request here, restating the path
 * segments as `resource` and `id` query parameters (a function reached through
 * a rewrite observes the destination path, not the original one). Routing and
 * response shaping live in `shared/api.ts` so the same logic is unit-testable
 * without a server.
 */

import { apiPathnameFor, handleApiRequest } from "../shared/api";

/** Tell Vercel to run this in the Edge Runtime (Web API, not Node.js). */
export const config = { runtime: "edge" };

import { runWithAdapter } from "../shared/adapter";
export default function (req: any, res: any) {
  return runWithAdapter(req, res, (request) => handleApiRequest(request, apiPathnameFor(request)));
}
