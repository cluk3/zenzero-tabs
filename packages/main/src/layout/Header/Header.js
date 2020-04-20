import React from "react";
import { Flex, Heading } from "rebass/styled-components";
import { SidebarToggle } from "./SidebarToggle";

export const Header = ({ isSidebarOpen }) => {
  return (
    <>
      <Flex
        width="100vw"
        height="48px"
        alignItems="center"
        bg="headerBg"
        sx={{
          boxShadow: "0px 1px 1px black",
          position: "fixed",
          top: 0,
          zIndex: 100,
          contain: "content",
          flexWrap: "wrap",
        }}
      >
        <SidebarToggle isSidebarOpen={isSidebarOpen} />
        <Heading ml={4} variant="appName">
          Zenzero
        </Heading>
      </Flex>
    </>
  );
};
