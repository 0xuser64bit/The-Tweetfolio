import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorBoundary from "./components/utils/ErrorBoundary";
import routes from "./routes";

/**
 * Browser entry point.
 *
 * The document is prerendered at build time by `entry-server.tsx`, so this
 * hydrates the existing markup instead of replacing it — that is what keeps the
 * raw HTML (H1, headings, body copy) readable to clients that never run JS.
 */
const router = createBrowserRouter(routes);

const tree = (
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

const rootElement = document.getElementById("root");

if (rootElement) {
  // `firstElementChild`, not `hasChildNodes()`: in `vite dev` the root still
  // holds the `<!--app-html-->` placeholder comment, which is a child node but
  // not markup to hydrate.
  if (rootElement.firstElementChild) {
    ReactDOM.hydrateRoot(rootElement, tree);
  } else {
    // No prerendered markup (`vite dev`, before the prerender step runs).
    ReactDOM.createRoot(rootElement).render(tree);
  }
}
