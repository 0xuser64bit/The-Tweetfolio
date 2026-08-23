import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
  },
  ssr: {
    // The prerenderer runs the same component tree as the browser; bundling
    // React and the router into the SSR build keeps a single copy of React in
    // play, which `renderToString` requires.
    noExternal: ["react", "react-dom", "react-router", "react-router-dom"],
  },
});
