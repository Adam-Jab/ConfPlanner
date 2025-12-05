"use client";

import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 12px 0;
  margin-bottom: 8px;
  background: #8bc5ff;
  position: fixed;
  z-index: 999;
`;
const Nav = styled.nav`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;
const Brand = styled.span`
  color: black;
  font-weight: 600;
`;
const NavLinks = styled.div`
  display: flex;
  gap: 12px;
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default function SiteHeader() {
  return (
    <Header>
      <Nav>
        <Brand>{"Conference Session Planner"}</Brand>
        <NavLinks>
          <StyledLink href="/">{"Home"}</StyledLink>
          <StyledLink href="/agenda">{"My Agenda"}</StyledLink>
        </NavLinks>
      </Nav>
    </Header>
  );
}
