"use client";

import React from "react";
import { AgendaProvider } from "@/contexts/AgendaContext";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AgendaProvider>{children}</AgendaProvider>
    </ThemeProvider>
  );
}
