import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { TabItem, CloseButton, TabFavIcon, TabTitle } from "./TabCard.styles";
import { focusTab, closeTab } from "api/browser";
import { ItemTypes } from "constants/dnd";
import { useDispatch } from "react-redux";
import { startDrag, endDrag } from "features/tabsSession";
import { moveTab } from "api/browser";
import { Box } from "rebass/styled-components";

// const hoverH =
export const TabCard = ({ tab, index, isDragging }) => {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    item: { type: ItemTypes.TAB, tabId: tab.id },

    begin(i) {
      dispatch(startDrag(tab.id));
    },
    end() {
      dispatch(endDrag());
    },
  });
  const [, drop] = useDrop({
    accept: ItemTypes.TAB,
    hover: ({ tabId }) => {
      if (tabId !== tab.id) {
        moveTab(tabId, tab.windowId, index);
      }
    },
  });
  return (
    <Box p="1" ref={(r) => dragRef(drop(r))}>
      <TabItem onClick={() => focusTab(tab)} isDragging={isDragging}>
        <CloseButton
          onClick={(e) => {
            closeTab(tab.id);
            e.stopPropagation();
          }}
        >
          X
        </CloseButton>
        <TabFavIcon
          src={
            tab.favIconUrl
              ? tab.favIconUrl
              : "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
          }
          alt="tab favicon"
        />
        <TabTitle>{tab.title}</TabTitle>
      </TabItem>
    </Box>
  );
};
