"use client";

import styled from "styled-components";
import Link from "next/link";

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

const Note = styled.p`
  color: black;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

export default function SessionNotFound() {
  return (
    <Container>
      <Title>{"Session not found"}</Title>
      <Note>
        {"Return to the "}
        <StyledLink href="/">{"sessions list"}</StyledLink>
        {"."}
      </Note>
    </Container>
  );
}
