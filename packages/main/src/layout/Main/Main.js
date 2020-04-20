import React from "react";
import { Flex } from "rebass/styled-components";

export const Main = ({ children, isSidebarOpen }) => {
  return (
    <Flex
      ml={!isSidebarOpen ? 3 : "350px"}
      mt={6}
      p={3}
      sx={{
        overflowX: "scroll",
        transition: "margin 0.3s ease",
        contain: "content",
      }}
    >
      {children}
    </Flex>
  );
};
