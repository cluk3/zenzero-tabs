import React from "react";
import { Flex, Heading, Box } from "rebass/styled-components";
import { TabsList } from "components/TabsList";
import { useDrop } from "react-dnd";
import { ItemTypes } from "constants/dnd";
import { moveTab } from "api/browser";

export const WindowItem = ({ isActive, window }) => {
  const [, dropRef] = useDrop({
    accept: ItemTypes.TAB,
    hover: ({ tabId }, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        moveTab(tabId, window.id);
      }
    },
  });
  return (
    <Flex
      m="1rem"
      backgroundColor="rgba(250,250,250, 0.5)"
      sx={{
        borderRadius: "4px",
        boxShadow: "2px 4px 4px -2px hsl(9, 50%, 50%)",
      }}
    >
      <Box ref={dropRef}>
        {isActive && <Heading variant="listTitle">Current Window</Heading>}
        <TabsList tabIds={window.tabs} />
      </Box>
    </Flex>
  );
};
