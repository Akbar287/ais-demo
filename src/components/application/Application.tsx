"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Landing } from "@/components/features/from-js/views_landing";
import { Login } from "@/components/features/from-js/views_login";
import { Modules } from "@/components/features/from-js/views_modules";
import {
  BeritaDetail,
  BeritaIndex,
  EventDetail,
  EventIndex,
} from "@/components/features/from-js/views_publik";
import { HOME_VIEW_BY_ROLE } from "@/config/roleRouting";
import { VIEW_REGISTRY, type ViewId } from "@/config/viewRegistry";
import { publicPath, roleViewPath, segmentToView } from "@/lib/appRoutes";
import type { DemoRole } from "@/types/demo";
import { AuthenticatedShell } from "./AuthenticatedShell";

type AppRoute =
  | { kind: "auth"; role: DemoRole; view: ViewId; canonical: string }
  | { kind: "login"; canonical: string }
  | { kind: "home"; canonical: string }
  | { kind: "modul"; canonical: string }
  | { kind: "berita"; id?: string; canonical: string }
  | { kind: "agenda"; id?: string; canonical: string };

const ROLES = Object.keys(HOME_VIEW_BY_ROLE) as DemoRole[];

function isRole(value: string | undefined): value is DemoRole {
  return !!value && ROLES.includes(value as DemoRole);
}

function isView(value: string): value is ViewId {
  return value in VIEW_REGISTRY;
}

function splitPath(pathname: string) {
  return pathname
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));
}

function parseRoute(pathname: string): AppRoute {
  const [first, second, ...rest] = splitPath(pathname);

  if (!first) return { kind: "home", canonical: publicPath("home") };
  if (first === "login") return { kind: "login", canonical: publicPath("login") };
  if (first === "modul" || first === "modules") return { kind: "modul", canonical: publicPath("modul") };
  if (first === "berita") {
    return { kind: "berita", id: second, canonical: publicPath("berita", second) };
  }
  if (first === "agenda" || first === "events") {
    return { kind: "agenda", id: second, canonical: publicPath("agenda", second) };
  }

  if (isRole(first)) {
    const requestedView = second ? segmentToView(second) : HOME_VIEW_BY_ROLE[first];
    const view = isView(requestedView) ? requestedView : HOME_VIEW_BY_ROLE[first];
    return {
      kind: "auth",
      role: first,
      view,
      canonical: roleViewPath(first, view, isView(requestedView) ? rest : []),
    };
  }

  return { kind: "home", canonical: publicPath("home") };
}

export function Application() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const route = useMemo(() => parseRoute(pathname), [pathname]);

  useEffect(() => {
    if (pathname !== route.canonical) {
      router.replace(route.canonical, { scroll: false });
    }
  }, [pathname, route.canonical, router]);

  const go = useCallback((href: string, scroll = true) => {
    router.push(href, { scroll });
  }, [router]);

  const goHome = useCallback((hash?: string) => {
    if (hash) {
      go(`${publicPath("home")}#${hash}`, false);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 90);
      return;
    }
    go(publicPath("home"));
  }, [go]);

  const nav = useMemo(() => {
    return {
      login: () => go(publicPath("login")),
      modul: () => go(publicPath("modul")),
      berita: () => go(publicPath("berita")),
      beritaDetail: (id: string) => go(publicPath("berita", id)),
      events: () => go(publicPath("agenda")),
      eventDetail: (id: string) => go(publicPath("agenda", id)),
      home: goHome,
    };
  }, [go, goHome]);

  if (route.kind === "auth") {
    return (
      <AuthenticatedShell
        key={route.role}
        role={route.role}
        view={route.view}
        onNavigate={(view) => go(roleViewPath(route.role, view))}
        onRoleChange={(nextRole) => {
          if (nextRole) {
            go(roleViewPath(nextRole, HOME_VIEW_BY_ROLE[nextRole]));
          } else {
            go(publicPath("login"));
          }
        }}
      />
    );
  }

  if (route.kind === "login") {
    return <Login onLogin={(nextRole: DemoRole) => go(roleViewPath(nextRole, HOME_VIEW_BY_ROLE[nextRole]))} />;
  }

  if (route.kind === "modul") {
    return (
      <Modules
        onLogin={() => nav.login()}
        onHome={() => nav.home()}
      />
    );
  }

  if (route.kind === "berita") {
    return route.id ? <BeritaDetail id={route.id} nav={nav} /> : <BeritaIndex nav={nav} />;
  }

  if (route.kind === "agenda") {
    return route.id ? <EventDetail id={route.id} nav={nav} /> : <EventIndex nav={nav} />;
  }

  return (
    <Landing
      onLogin={() => nav.login()}
      onModul={() => nav.modul()}
      nav={nav}
    />
  );
}
