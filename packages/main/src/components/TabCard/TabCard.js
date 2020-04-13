import React from "react";
import { useDrag } from "react-dnd";
import { TabItem, CloseButton, TabFavIcon, TabTitle } from "./TabCard.styles";
import { focusTab, closeTab } from "api/browser";
import { ItemTypes } from "constants/dnd";

export const TabCard = ({ tab }) => {
  const [{ opacity, isDragging }, dragRef] = useDrag({
    item: { type: ItemTypes.TAB, tab },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <TabItem
      key={tab.id}
      onClick={() => focusTab(tab)}
      ref={dragRef}
      style={{ opacity }}
    >
      <CloseButton
        onClick={(e) => {
          closeTab(tab.id);
          e.stopPropagation();
        }}
      />
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
  );
};
