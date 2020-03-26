import React from "react";
import styled from "styled-components";
import { TabsList } from "./TabsList";
import * as R from "ramda";

const WindowsList = styled.ul`
  list-style-type: none;
`;

const WindowItem = styled.li`
  display: flex;
  padding: 1rem;
  margin: 1rem;
  border: 2px blue solid;
`;
const generateWindowItems = R.compose(
  R.values,
  R.mapObjIndexed((tabs, windowId) => (
    <WindowItem key={windowId}>
      <TabsList tabs={tabs} />
    </WindowItem>
  ))
);

export const TabsView = ({ tabsByWindow }) => {
  return <WindowsList>{generateWindowItems(tabsByWindow)}</WindowsList>;
};
