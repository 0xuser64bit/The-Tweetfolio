import { handleNotFound } from "../shared/not-found-page";

export const config = { runtime: "edge" };

export default function (request: Request): Response {
  try {
    return handleNotFound(request);
  } catch (error: any) {
    return new Response(String(error.stack || error.message || error), { status: 500 });
  }
}
