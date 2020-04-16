import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "./ginger.svg";
import { Flex } from "rebass/styled-components";
const HeaderContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5rem 15rem;
  width: 100vw;
  height: 4rem;
  align-content: center;
  vertical-align: center;
  background-color: #5ee985;
  color: white;
`;

const AppName = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  letter-spacing: 0.19em;
`;
export const Header = () => {
  return (
    <HeaderContainer>
      <Flex justifyContent="center" alignItems="center">
        <Logo width="48px" height="48px" />
      </Flex>
      <AppName>Zenzero</AppName>
    </HeaderContainer>
  );
};
