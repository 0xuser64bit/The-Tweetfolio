import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/utils/Error";
import ErrorBoundary from "./components/utils/ErrorBoundary";
import { SuspenseLoader } from "./components/LoadingScreen";

const ProjectsTweetThread = lazy(
  () => import("./components/tweets/ProjectsTweetThread"),
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "proof-of-work",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ProjectsTweetThread title="Proof of Work" />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>,
  );
}
