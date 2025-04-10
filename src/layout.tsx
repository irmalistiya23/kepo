import { Suspense, type Component } from "solid-js";
import { useLocation } from "@solidjs/router";

import Navbar from "./components/layout/landing/navbar.tsx";
import Sidebar from "./components/layout/dashboard/Sidebar.tsx";

// Utility function to generate route patterns
const createRoutePatterns = (base: string, paths: string[]): string[] => 
  paths.map(path => `${base}${path}`);

const App: Component = (props: {children: Element|any}) => {
  const location = useLocation();

  // Define route groups
  const ROUTES = {
    landing: createRoutePatterns('/', ['', '/']),
    dashboard: createRoutePatterns('/dashboard', ['', '/', '/profile'])
  };

  // Reusable content wrapper with optional class
  const ContentWrapper = (className = '') => (
    <main class={className}>
      <Suspense>{props.children}</Suspense>
    </main>
  );

  // Determine the appropriate layout based on current route
  const determineLayout = () => {
    const { pathname } = location;

    if (ROUTES.landing.includes(pathname)) {
      return (
        <>
          <Navbar />
          {ContentWrapper('mt-8')}
        </>
      );
    }

    if (ROUTES.dashboard.includes(pathname)) {
      return <Sidebar>{ContentWrapper()}</Sidebar>;
    }

    return ContentWrapper();
  };

  return determineLayout();
};

export default App;