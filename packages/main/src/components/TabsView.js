import React from "react";
import { WindowItem } from "components/WindowItem";
import { windowsSelector } from "features/tabsSession";
import { useSelector } from "react-redux";

import { Flex } from "rebass/styled-components";

export const TabsView = () => {
  const windows = useSelector(windowsSelector);
  return (
    <Flex sx={{ flexGrow: 1, flexShrink: 0 }}>
      {windows.length ? (
        windows.map((window) => (
          <WindowItem
            key={window.id}
            isActive={window.focused}
            window={window}
          />
        ))
      ) : (
        <h2>Wait for it...</h2>
      )}
    </Flex>
  );
};
