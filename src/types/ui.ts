import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import type {
  DemoRole,
  NavigationSection,
  Persona,
  RoleMeta,
} from "./demo";
import type { ViewId } from "@/config/viewRegistry";

export type IconProps = {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export type AvatarProps = {
  name: string;
  background: string;
  color: string;
  className?: string;
  style?: CSSProperties;
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: string;
  dot?: boolean;
};

export type BarcodeProps = {
  width?: number;
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
};

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  size?: number;
};

export type ImgPlaceholderProps = {
  label: string;
  h?: number;
  r?: number;
};

export type DialogProps = {
  children: ReactNode;
  onClose: () => void;
  width?: CSSProperties["width"];
  maxHeight?: CSSProperties["maxHeight"];
  className?: string;
  style?: CSSProperties;
};

export type ModalProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
};

export type PageHeadProps = {
  title: ReactNode;
  desc?: ReactNode;
  actions?: ReactNode;
};

export type SearchBoxProps = {
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
};

export type PeriodStatus = "active" | "planning" | "archived";

export type AcademicPeriod = {
  id: string;
  ta: string;
  smt: string;
  status: PeriodStatus;
};

export type PeriodContextValue = {
  period: AcademicPeriod;
  setPeriod: (period: AcademicPeriod) => void;
};

export type StaffHeroProps = {
  persona: Persona;
  role: DemoRole;
  sub?: string;
  action?: ReactNode;
};

export type ToastKind = "ok" | "err";
export type ToastPush = (message: string, kind?: ToastKind) => void;

export type RoleSwitcherDialogProps = {
  role: DemoRole;
  onPick: (role: DemoRole | null) => void;
  onClose: () => void;
};

export type SidebarProps = {
  navSections: NavigationSection[];
  activeView: string;
  meta: RoleMeta;
  persona: Persona;
  switcherOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleRoleSwitcher: () => void;
};

export type TopbarProps = {
  crumbGroup: string;
  crumbPage: string;
  onOpenNav: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export type AppShellProps = {
  role: DemoRole;
  setRole: (role: DemoRole | null) => void;
  navSections: NavigationSection[];
  activeView: string;
  meta: RoleMeta;
  persona: Persona;
  crumbGroup: string;
  crumbPage: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
};

export type AuthenticatedShellProps = {
  role: DemoRole;
  view: ViewId;
  onNavigate: (view: ViewId) => void;
  onRoleChange: (role: DemoRole | null) => void;
};
