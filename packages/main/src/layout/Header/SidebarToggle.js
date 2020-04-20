import React, { useCallback } from "react";
import { Burger } from "components/Burger";
import { useDispatch } from "react-redux";
import { sidebarToggleClicked } from "features/ui";
import { Flex } from "rebass/styled-components";

export const SidebarToggle = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const handleToggleClicked = useCallback(() => {
    dispatch(sidebarToggleClicked());
  }, [dispatch]);
  return (
    <Flex ml={3} justifyContent="center" alignItems="center" height="100%">
      <Burger
        isCollapsed={isSidebarOpen}
        toggleCollapsed={handleToggleClicked}
        size={32}
      ></Burger>
    </Flex>
  );
};
