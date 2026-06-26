import type * as ReactType from "react";

declare global {
  interface Window {
    React: typeof ReactType;
    AIS_DATA: any;
    AIS_ROLES: any;
    AIS_ERD: any;
    AIS_PERIODS: any[];
    AIS_STORAGE: {
      get(key: string): string | null;
      set(key: string, value: string): void;
    };
    [key: string]: any;
  }
}

export {};
