import { Suspense, type Component, Switch, Match } from "solid-js";
import Navbar from "./components/landing/navbar.tsx";
import DashboardSidebar from "@/components/dashboard/Sidebar.tsx";
import { useLocation } from "@solidjs/router";

const App: Component = (props: { children: Element }) => {
  const location = useLocation();
  const LandingPageNavbarRoutes = ["/"];
  const DashboardBase = "/dashboard";
  const DashboardPageSidebarRoutes = ["", "/about"].map(
    (path) => DashboardBase + path
  );

  const Content = (kelas:string = "")=>(
    <main class={kelas}>
      <Suspense>{props.children}</Suspense>
    </main>
  );

  return (
    <Switch>
      <Match when={LandingPageNavbarRoutes.includes(location.pathname)}>
        <Navbar />
        {Content("mt-8")}
      </Match>

      <Match when={DashboardPageSidebarRoutes.includes(location.pathname)}>
        <DashboardSidebar>{Content()}</DashboardSidebar>
      </Match>

      <Match when={true}>{Content()}</Match>
    </Switch>
  );
};

export default App;
