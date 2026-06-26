import * as React from "react";
import { createRoot } from "react-dom/client";
import { APP_CONFIG } from "./config/app";
import { getRootElement } from "./lib/dom";
import "./services/storage";
import "./styles/global.css";
import App from "./router/App";

const { ToastProvider } = window as any;

document.title = APP_CONFIG.title;

createRoot(getRootElement()).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
