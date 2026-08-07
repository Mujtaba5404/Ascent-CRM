import { AppShell } from "@mantine/core";
import { useDebouncedValue, useLocalStorage, useViewportSize } from "@mantine/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "src/layouts/AppSidebar";
import AppHeader from "src/layouts/AppHeader";

const AppLayout = () => {
  const { width } = useViewportSize();
  const [debouncedWidth] = useDebouncedValue(width, 250);

  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage({ key: "sidebar-collapsed", defaultValue: true, getInitialValueInEffect: false });
  const sidebarWidth = sidebarCollapsed ? 60 : 225;

  const handleSidebarCollapse = () => setSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    if (debouncedWidth < 992 && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [debouncedWidth, sidebarCollapsed]);

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: sidebarWidth }} padding={"md"} styles={{ navbar: { transition: "width 200ms" } }}>
      <AppShell.Navbar px={"sm"} py={"md"}>
        <AppSidebar sidebarCollapsed={sidebarCollapsed} />
      </AppShell.Navbar>

      <AppShell.Header px={"md"}>
        <AppHeader sidebarCollapsed={sidebarCollapsed} handleSidebarCollapse={handleSidebarCollapse} />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
