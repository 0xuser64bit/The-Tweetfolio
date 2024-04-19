import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/utils/Error";
import ProjectsTweetThread from "./components/tweets/ProjectsTweetThread";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: "projects/",
        element: <ProjectsTweetThread title={"Projects untill now..."} />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
