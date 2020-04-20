import React, { memo } from "react";
import { TabItem, CloseButton, TabFavIcon, TabTitle } from "./TabCard.styles";
import { focusTab, closeTab } from "api/browser";

// const hoverH =
export const TabCard = memo(({ tab, isDragging, isOver }) => {
  return (
    <TabItem
      onClick={() => focusTab(tab)}
      isOver={isOver}
      isDragging={isDragging}
    >
      <CloseButton
        onClick={(e) => {
          closeTab(tab.id);
          e.stopPropagation();
        }}
      ></CloseButton>
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
});
