import React from "react";
import { Flex } from "rebass/styled-components";
import { TabsList } from "components/TabsList";
import { useDrop } from "react-dnd";
import { ItemTypes } from "constants/dnd";
import { moveTab } from "api/browser";

export const WindowItem = ({ isActive, window }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TAB,
    drop: ({ tab }) => moveTab(tab, window),
  });
  return (
    <Flex
      p="1rem"
      m="1rem"
      sx={{ border: `2px ${isActive ? "green" : "blue"} solid` }}
      ref={drop}
    >
      <TabsList tabIds={window.tabs} />
    </Flex>
  );
};
