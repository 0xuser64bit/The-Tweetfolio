import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/utils/Error";
import ErrorBoundary from "./components/utils/ErrorBoundary";

const ProjectsTweetThread = lazy(
  () => import("./components/tweets/ProjectsTweetThread")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "proof-of-work",
    element: (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-x-primary">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-x-accent animate-pulse">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        }
      >
        <ProjectsTweetThread title={"Proof of Work"} />
      </Suspense>
    ),
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
