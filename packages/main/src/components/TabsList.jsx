import React from "react";
import styled from "styled-components";
import { TabCard } from "components/TabCard";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const getTabById = createSelector(
  (state) => state.tabs,
  (_, ids) => ids,
  (tabs, ids) => ids.map((id) => tabs.byId[id])
);

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(6rem, 1fr));
`;

export const TabsList = ({ tabIds }) => {
  const tabs = useSelector((state) => getTabById(state, tabIds));
  const draggedTabId = useSelector((state) => state.drag.tabId);

  return (
    <ListContainer>
      {tabs
        // .filter((tab) => tab.url !== currentTabUrl)
        .map((tab, i) => (
          <TabCard
            key={tab.id}
            tab={tab}
            index={i}
            isDragging={draggedTabId === tab.id}
          ></TabCard>
        ))}
    </ListContainer>
  );
};
