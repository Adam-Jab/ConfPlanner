"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import type { Session } from "@/types/session";
import { useAgenda } from "@/contexts/AgendaContext";
import Link from "next/link";
import { formatTimeUTC } from "@/lib/format";

const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 50px 16px 48px;
`;

const Title = styled.h1`
  color: black;
  margin: 0 0 16px 0;
  font-size: 28px;
`;

const Warning = styled.div`
  margin-bottom: 12px;
  background: #fff3cd;
  border: 1px solid #ffe69c;
  padding: 10px 12px;
  border-radius: 8px;
  color: black;
  strong {
    color: black;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li<{ $conflicted: boolean }>`
  border: 1px solid ${({ $conflicted }) => ($conflicted ? "#ffe69c" : "rgba(0, 0, 0, 0.75)")};
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  background: ${({ $conflicted }) => ($conflicted ? "#fff3cd" : "#f9feff")};
  color: black;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;

const AgendaTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: black;
`;

const Meta = styled.small`
  opacity: 0.75;
  color: black;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  color: black;
`;

const Button = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #c62828;
  color: #ffffff;
  background: #c62828;
  cursor: pointer;
`;

const Controls = styled.div`
  margin-top: 12px;
`;

const Note = styled.p`
  color: black;
`;

const StyledNoteLink = styled(Link)`
  color: black;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

function overlaps(a: Session, b: Session) {
  return new Date(a.startTime) < new Date(b.endTime) && new Date(b.startTime) < new Date(a.endTime);
}

export default function AgendaClient({ allSessions }: { allSessions: Session[] }) {
  const { selectedIds, remove, clear, hydrated } = useAgenda();
  const selected = useMemo(
    () =>
      allSessions
        .filter((s) => selectedIds.has(s.id))
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
    [allSessions, selectedIds],
  );

  const conflicts = useMemo(() => {
    const pairs: [Session, Session][] = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        if (overlaps(selected[i], selected[j])) pairs.push([selected[i], selected[j]]);
      }
    }
    return pairs;
  }, [selected]);

  const isConflicted = (session: Session): boolean => {
    return conflicts.some(([a, b]) => a.id === session.id || b.id === session.id);
  };

  return (
    <Container>
      <Title>{"My Agenda"}</Title>
      {conflicts.length > 0 && (
        <Warning>
          <strong>{"Warning:"}</strong> {"You have "}
          {conflicts.length} {"time conflict"}
          {conflicts.length > 1 ? "s" : ""}.
        </Warning>
      )}
      {!hydrated ? null : selected.length === 0 ? (
        <Note>
          {"No sessions yet."}
          <br />
          {"Browse the "}
          <StyledNoteLink href="/">{"sessions list"}</StyledNoteLink>
          {"."}
        </Note>
      ) : (
        <>
          <List>
            {selected.map((selectedAgenda) => (
              <Item key={selectedAgenda.id} $conflicted={isConflicted(selectedAgenda)}>
                <Row>
                  <div>
                    <AgendaTitle>
                      <StyledLink href={`/sessions/${selectedAgenda.id}`}>
                        {selectedAgenda.title}
                      </StyledLink>
                    </AgendaTitle>
                    <Meta>
                      {formatTimeUTC(selectedAgenda.startTime)} –{" "}
                      {formatTimeUTC(selectedAgenda.endTime)} • {selectedAgenda.room}
                    </Meta>
                  </div>
                  <Button onClick={() => remove(selectedAgenda.id)}>{"Remove"}</Button>
                </Row>
              </Item>
            ))}
          </List>
          <Controls>
            <Button onClick={clear}>{"Clear agenda"}</Button>
          </Controls>
        </>
      )}
    </Container>
  );
}
