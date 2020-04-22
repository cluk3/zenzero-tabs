import React, { memo } from "react";
import { TabItem, CloseButton, TabFavIcon, TabTitle } from "./TabCard.styles";
import { focusTab, closeTab, getFaviconUrl } from "api/browser";

export const TabCard = memo(({ tab, isDragging }) => {
  return (
    <TabItem onClick={() => focusTab(tab)} isDragging={isDragging}>
      <CloseButton
        onClick={(e) => {
          closeTab(tab.id);
          e.stopPropagation();
        }}
      ></CloseButton>
      <TabFavIcon src={getFaviconUrl(tab.url)} alt="tab favicon" />
      <TabTitle>{tab.title}</TabTitle>
    </TabItem>
  );
});
