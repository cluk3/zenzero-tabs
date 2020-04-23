import React from "react";

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Flex } from "rebass/styled-components";

const getTabById = createSelector(
  (state) => state.tabs,
  (_, ids) => ids,
  (tabs, ids) => ids.map((id) => tabs.byId[id])
);

export const TabsList = React.forwardRef(({ tabIds, children }, ref) => {
  const tabs = useSelector((state) => getTabById(state, tabIds));

  return (
    <Flex ref={ref} flexDirection="column">
      {children({ tabs })}
    </Flex>
  );
});
