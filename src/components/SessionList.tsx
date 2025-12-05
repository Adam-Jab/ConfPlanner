"use client";

import Link from "next/link";
import React, { useMemo, useState, Fragment } from "react";
import styled from "styled-components";
import type { Session, TimeOfDay } from "@/types/session";
import { getTimeOfDay } from "@/types/session";
import { formatTimeRangeUTC } from "@/lib/format";
import { Listbox, Transition } from "@headlessui/react";

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

const SelectRoot = styled.div`
  position: relative;
`;

const SelectButton = styled(Listbox.Button)`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background: #fff;
  color: black;
  text-align: left;
  font-size: 16px;
  line-height: 1.4;
`;

const Options = styled(Listbox.Options)`
  position: absolute;
  z-index: 20;
  margin-top: 6px;
  max-height: 260px;
  overflow: auto;
  width: 100%;
  background: #fff;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-size: 16px; /* readable on mobile */
  li,
  button,
  div {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const OptionButton = styled.button<{ $active?: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: none;
  background: ${({ $active }) => ($active ? "#eef2ff" : "transparent")};
  color: black;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.4;
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
        <SelectRoot>
          <Listbox value={track} onChange={(v: string) => setTrack(v)}>
            {({ open }: { open: boolean }) => (
              <>
                <SelectButton aria-label="Filter by track">
                  {track === "All" ? "All tracks" : track}
                </SelectButton>
                <Transition as={Fragment} show={open}>
                  <Options as="ul" role="listbox">
                    {tracks.map((t) => (
                      <Listbox.Option key={t} value={t} as="li">
                        {({ active }: { active: boolean }) => (
                          <OptionButton $active={active} type="button">
                            {t === "All" ? "All tracks" : t}
                          </OptionButton>
                        )}
                      </Listbox.Option>
                    ))}
                  </Options>
                </Transition>
              </>
            )}
          </Listbox>
        </SelectRoot>

        <SelectRoot>
          <Listbox value={timeOfDay} onChange={(v: TimeOfDay | "All") => setTimeOfDay(v)}>
            {({ open }: { open: boolean }) => (
              <>
                <SelectButton aria-label="Filter by time of day">
                  {timeOfDay === "All" ? "All times" : timeOfDay}
                </SelectButton>
                <Transition as={Fragment} show={open}>
                  <Options as="ul" role="listbox">
                    {["All", "Morning", "Afternoon", "Evening"].map((t) => (
                      <Listbox.Option key={t} value={t as any} as="li">
                        {({ active }: { active: boolean }) => (
                          <OptionButton $active={active} type="button">
                            {t === "All" ? "All times" : t}
                          </OptionButton>
                        )}
                      </Listbox.Option>
                    ))}
                  </Options>
                </Transition>
              </>
            )}
          </Listbox>
        </SelectRoot>
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
