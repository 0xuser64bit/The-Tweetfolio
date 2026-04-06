import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/utils/Error";
import ErrorBoundary from "./components/utils/ErrorBoundary";
import PROFILE_IMAGE from "./assets/profile.jpg";

const ProjectsTweetThread = lazy(
  () => import("./components/tweets/ProjectsTweetThread")
);

const SuspenseLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="absolute -inset-2 w-28 h-28 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>
        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-slate-700">
          <img src={PROFILE_IMAGE} alt="Profile" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  </div>
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
      <Suspense fallback={<SuspenseLoader />}>
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
