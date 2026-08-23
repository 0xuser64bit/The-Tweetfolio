import { apiPathnameFor, handleApiRequest } from "../shared/api";

export const config = { runtime: "edge" };

export default function (request: Request): Response {
  try {
    return handleApiRequest(request, apiPathnameFor(request));
  } catch (error: any) {
    return new Response(String(error.stack || error.message || error), { status: 500 });
  }
}
