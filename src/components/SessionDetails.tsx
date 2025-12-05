"use client";

import styled from "styled-components";
import type { Session } from "@/types/session";
import { formatTimeRangeUTC } from "@/lib/format";
import AddToAgendaButton from "@/components/AddToAgendaButton";

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 16px 48px;
`;

const Title = styled.h1`
  color: black;
  margin: 0 0 8px 0;
  font-size: 28px;
`;

const Meta = styled.p`
  margin: 0;
  opacity: 0.75;
  color: black;
`;

const Speaker = styled.p`
  margin-top: 8px;
  color: black;
`;

const Description = styled.p`
  margin-top: 16px;
  line-height: 1.6;
  color: black;
`;

const Actions = styled.div`
  margin-top: 16px;
`;

export default function SessionDetails({ session }: { session: Session }) {
  return (
    <Container>
      <Title>{session.title}</Title>
      <Meta>
        {formatTimeRangeUTC(session.startTime, session.endTime)} • {session.track} • {session.room}
      </Meta>
      <Speaker>
        <strong>{"Speaker:"}</strong> {session.speaker}
      </Speaker>
      <Description>{session.description}</Description>
      <Actions>
        <AddToAgendaButton id={session.id} />
      </Actions>
    </Container>
  );
}
