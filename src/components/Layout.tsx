import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./sidebar/LeftSidebar";
import RightSidebar from "./sidebar/RightSidebar";
import BottomNav from "./sidebar/BottomNav";
import LoadingScreen from "./LoadingScreen";

/**
 * Shared layout that persists across all routes.
 * Keeps the left sidebar, right sidebar, and bottom nav mounted
 * so they never unmount/remount on route changes (no layout shift).
 */
const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div
        className={`mx-auto grid justify-center grid-cols-1 md:grid-cols-[88px_minmax(0,600px)] lg:grid-cols-[88px_minmax(0,600px)_350px] xl:grid-cols-[275px_minmax(0,600px)_350px] xl:gap-x-0 ${isLoading ? "hidden" : ""}`}
      >
        {/* Skip to main content */}
        <a
          href="#main-feed"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-x-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>

        {/* Left sidebar — icon-only at md/lg, full at xl */}
        <aside className="hidden md:flex justify-end xl:pr-6">
          <LeftSidebar />
        </aside>

        {/* Main feed — 600px max like X */}
        <main
          id="main-feed"
          className="w-full max-w-150 min-h-screen md:border-x md:border-x-border pb-16 md:pb-0"
        >
          <Outlet />
        </main>

        {/* Right sidebar — 350px like X */}
        <aside className="hidden lg:block pl-6">
          <RightSidebar />
        </aside>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </>
  );
};

export default Layout;
