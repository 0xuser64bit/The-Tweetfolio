import React from "react";
import type { RouteObject } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout";
import ProjectsTweetThread from "./components/tweets/ProjectsTweetThread";
import Error, { ErrorView } from "./components/utils/Error";

/**
 * Single route list shared by the browser entry (`entry-client.tsx`) and the
 * build-time prerenderer (`entry-server.tsx`), so the server-rendered HTML and
 * the hydrated app can never disagree about which component owns a path.
 */
const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <App /> },
      {
        path: "proof-of-work",
        element: <ProjectsTweetThread title="Proof of Work" />,
      },
    ],
  },
  // Client-side fallback only: real requests for unknown paths never reach the
  // bundle, because `api/not-found.ts` answers them with an HTTP 404 first.
  { path: "*", element: <ErrorView status={404} /> },
];

export default routes;
