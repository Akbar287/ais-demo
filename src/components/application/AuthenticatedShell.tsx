"use client";

import { useState } from "react";
import { PeriodProvider, usePeriod } from "@/components/molecules/period";
import { AppShell } from "@/components/templates";
import {
  HOME_VIEW_BY_ROLE,
} from "@/config/roleRouting";
import { VIEW_REGISTRY, type ViewId } from "@/config/viewRegistry";
import { AIS_ROLES } from "@/data/roles";
import type { AuthenticatedShellProps } from "@/types/ui";

function ShellContent({ role, view, onNavigate, onRoleChange }: AuthenticatedShellProps) {
  const activeView: ViewId = view in VIEW_REGISTRY ? view : HOME_VIEW_BY_ROLE[role];
  const [krsState, setKrsState] = useState({
    selected: [],
    submitted: false,
    approved: false,
    sks: 0,
  });
  const { period } = usePeriod();
  const persona = AIS_ROLES.personas[role];
  const meta = AIS_ROLES.roleMeta[role];
  const navigation = AIS_ROLES.navByRole[role];

  function navigate(nextView: string) {
    if (nextView in VIEW_REGISTRY) {
      onNavigate(nextView as ViewId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const [crumbGroup, crumbPage] = AIS_ROLES.titles[activeView] ?? ["", ""];
  const renderView = VIEW_REGISTRY[activeView] ?? VIEW_REGISTRY[HOME_VIEW_BY_ROLE[role]];
  const context = {
    nav: navigate,
    role,
    krsState,
    setKrsState,
    period,
    isArchived: period.status !== "active",
  };

  return (
    <AppShell
      role={role}
      setRole={onRoleChange}
      navSections={navigation}
      activeView={activeView}
      meta={meta}
      persona={persona}
      crumbGroup={crumbGroup}
      crumbPage={crumbPage}
      onNavigate={navigate}
    >
      {renderView(context)}
    </AppShell>
  );
}

export function AuthenticatedShell(props: AuthenticatedShellProps) {
  return (
    <PeriodProvider>
      <ShellContent {...props} />
    </PeriodProvider>
  );
}
