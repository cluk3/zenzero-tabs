import React from "react";
import { Flex, Box } from "rebass/styled-components";

export const Main = ({ children, isSidebarOpen }) => {
  return (
    <Flex
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box
        width={isSidebarOpen ? "320px" : 0}
        sx={{
          transition: "width 0.3s ease",
          flexShrink: 0,
        }}
      ></Box>
      <Flex
        ml={3}
        mt={6}
        py={3}
        px="2px"
        sx={{
          overflowX: "scroll",
          contain: "content",
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
