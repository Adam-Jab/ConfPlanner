"use client";

import React from "react";
import styled from "styled-components";
import { useAgenda } from "@/contexts/AgendaContext";

const Button = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.danger : theme.colors.success)};
  color: #ffffff;
  background: ${({ theme, $active }) => ($active ? theme.colors.danger : theme.colors.success)};
  cursor: pointer;
`;

export default function AddToAgendaButton({ id }: { id: string }) {
  const { selectedIds, toggle, hydrated } = useAgenda();
  if (!hydrated) return null;
  const active = selectedIds.has(id);
  return (
    <Button aria-pressed={active} $active={active} onClick={() => toggle(id)}>
      {active ? "Remove from my agenda" : "Add to my agenda"}
    </Button>
  );
}
