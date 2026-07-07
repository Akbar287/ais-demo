import { useState } from "react";
import { PeriodBanner } from "../molecules/period";
import { RoleSwitcherDialog } from "../organisms/RoleSwitcherDialog";
import { Sidebar } from "../organisms/Sidebar";
import { Topbar } from "../organisms/Topbar";
import type { AppShellProps } from "@/types/ui";

export function AppShell({
  role,
  setRole,
  navSections,
  activeView,
  meta,
  persona,
  crumbGroup,
  crumbPage,
  onNavigate,
  children,
}: AppShellProps) {
  const [switcher, setSwitcher] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function navigate(id: string) {
    onNavigate(id);
    setNavOpen(false);
  }

  return (
    <>
      <div className={"app app-glass" + (navOpen ? " nav-open" : "") + (sidebarCollapsed ? " sidebar-collapsed" : "")}>
        <div className="nav-overlay" onClick={() => setNavOpen(false)} />
        <Sidebar
          navSections={navSections}
          activeView={activeView}
          meta={meta}
          persona={persona}
          switcherOpen={switcher}
          onNavigate={navigate}
          onToggleRoleSwitcher={() => setSwitcher((s) => !s)}
        />
        <div className="main">
          <Topbar
            crumbGroup={crumbGroup}
            crumbPage={crumbPage}
            onOpenNav={() => setNavOpen(true)}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((collapsed) => !collapsed)}
          />
          <main className="content" key={role + activeView}>
            <PeriodBanner />
            {children}
          </main>
        </div>
      </div>
      {switcher && <RoleSwitcherDialog role={role} onPick={setRole} onClose={() => setSwitcher(false)} />}
    </>
  );
}
