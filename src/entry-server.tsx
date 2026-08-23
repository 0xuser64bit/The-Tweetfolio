import React from "react";
import { renderToString } from "react-dom/server";
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom";
import { ORIGIN } from "../shared/site";
import routes from "./routes";

/**
 * Build-time renderer. Invoked by `scripts/prerender.ts` through Vite's SSR
 * pipeline to turn each route in `src/routes.tsx` into static HTML, so AI
 * crawlers and no-JS clients receive real content instead of an empty shell.
 */
export const render = async (
  path: string,
): Promise<{ html: string; status: number }> => {
  const handler = createStaticHandler(routes);
  const request = new Request(new URL(path, ORIGIN), { method: "GET" });
  const context = await handler.query(request);

  if (context instanceof Response) {
    throw new Error(
      `Prerendering "${path}" produced a ${context.status} redirect, which the static build cannot represent.`,
    );
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  return {
    html: renderToString(
      <StaticRouterProvider router={router} context={context} />,
    ),
    status: context.statusCode,
  };
};
