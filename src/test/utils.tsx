"use client";

import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { AgendaProvider } from "@/contexts/AgendaContext";

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AgendaProvider>{children}</AgendaProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
