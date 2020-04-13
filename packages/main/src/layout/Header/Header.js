import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 4rem;
  align-content: center;
  vertical-align: center;
  background-color: black;
  color: white;
`;
export const Header = () => {
  return <HeaderContainer>Zenzero</HeaderContainer>;
};
