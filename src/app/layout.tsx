import type { Metadata } from "next";
import type { ReactNode } from "react";
import { APP_CONFIG } from "@/config/app";
import "@/styles/global.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: APP_CONFIG.title,
  description: "Sistem Informasi Akademik Institut Teknologi Indonesia",
  icons: {
    icon: "/icon/favicon.ico",
    shortcut: "/icon/favicon.ico",
    apple: "/icon/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
