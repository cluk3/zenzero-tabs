import React from "react";
import styled from "styled-components";
import { TabCard } from "components/TabCard";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import browser from "webextension-polyfill";

const getTabById = createSelector(
  (state) => state.tabs,
  (_, ids) => ids,
  (tabs, ids) => ids.map((id) => tabs.byId[id])
);

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(6rem, 1fr));
  grid-gap: 1rem;
`;

const currentTabUrl = browser.runtime.getURL("index.html");

export const TabsList = ({ tabIds }) => {
  const tabs = useSelector((state) => getTabById(state, tabIds));

  return (
    <ListContainer>
      {tabs
        .filter((tab) => tab.url !== currentTabUrl)
        .map((tab) => (
          <TabCard key={tab.id} tab={tab}></TabCard>
        ))}
    </ListContainer>
  );
};
