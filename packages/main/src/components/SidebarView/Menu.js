import React, { memo } from "react";
import { Flex, Text } from "rebass/styled-components";

export const Menu = memo(({ navigateTo }) => (
  <Flex flexDirection="column">
    <Text
      my={4}
      as="h2"
      sx={{ cursor: "pointer" }}
      onClick={() => navigateTo("session")}
    >
      Session
    </Text>
    <Text
      as="h2"
      sx={{ cursor: "pointer" }}
      onClick={() => navigateTo("bookmarks")}
    >
      Bookmarks
    </Text>
  </Flex>
));
