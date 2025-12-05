"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import type { Session, TimeOfDay } from "@/types/session";
import { getTimeOfDay } from "@/types/session";
import { formatTimeRangeUTC } from "@/lib/format";

type Props = {
  initialSessions: Session[];
};

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

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 180px 180px;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background: #fff;
  color: black;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background: #fff;
  color: black;
`;

const Option = styled.option`
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background: #fff;
  color: black;
`;

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 14px;
  background: #fbfbfb;
`;

const CardTitle = styled.h3`
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Small = styled.small`
  color: black;
  opacity: 0.75;
`;

const CardSpeaker = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 400;
  color: black;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  color: black;
  cursor: pointer;
`;

const EmptyState = styled.div`
  margin-top: 8px;
  padding: 16px;
  border: 1px dashed rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: black;
`;

export default function SessionList({ initialSessions }: Props) {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<string>("All");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | "All">("All");

  const tracks = useMemo(() => {
    // This is a memoized function that returns the tracks array
    return ["All", ...Array.from(new Set(initialSessions.map((s) => s.track)))];
  }, [initialSessions]);

  const filtered = useMemo(() => {
    // This is a memoized function that returns the filtered sessions array
    const q = query.trim().toLowerCase();
    return initialSessions.filter((s) => {
      const matchesQuery =
        !q || s.title.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q);

      const matchesTrack = track === "All" || s.track === track;
      const matchesTime = timeOfDay === "All" || getTimeOfDay(s.startTime) === timeOfDay;

      return matchesQuery && matchesTrack && matchesTime;
    });
  }, [initialSessions, query, track, timeOfDay]);

  return (
    <Container>
      <Title>{"Conference Sessions Planner"}</Title>

      <Controls>
        <Input
          type="search"
          placeholder="Search by title or speaker..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search sessions"
        />
        <Select
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          aria-label="Filter by track"
        >
          {tracks.map((track) => {
            const label = track === "All" ? "All tracks" : track;
            return (
              <Option key={track} value={track}>
                {label}
              </Option>
            );
          })}
        </Select>
        <Select
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value as any)}
          aria-label="Filter by time of day"
        >
          <option value="All">{"All times"}</option>
          <option value="Morning">{"Morning"}</option>
          <option value="Afternoon">{"Afternoon"}</option>
          <option value="Evening">{"Evening"}</option>
        </Select>
      </Controls>

      <ActionsRow>
        <Button
          type="button"
          onClick={() => {
            setQuery("");
            setTrack("All");
            setTimeOfDay("All");
          }}
        >
          {"Clear filters"}
        </Button>
      </ActionsRow>

      {filtered.length === 0 ? (
        <EmptyState>
          {"No sessions match your filters."}{" "}
          <Button
            type="button"
            onClick={() => {
              setQuery("");
              setTrack("All");
              setTimeOfDay("All");
            }}
          >
            {"Reset"}
          </Button>
        </EmptyState>
      ) : (
        <Grid>
          {filtered.map((session) => {
            return (
              <Card key={session.id}>
                <CardTitle>
                  <StyledLink href={`/sessions/${session.id}`}>{session.title}</StyledLink>
                </CardTitle>
                <Small>
                  {formatTimeRangeUTC(session.startTime, session.endTime)} • {session.track} •{" "}
                  {session.room}
                </Small>
                <CardSpeaker>{session.speaker}</CardSpeaker>
              </Card>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
