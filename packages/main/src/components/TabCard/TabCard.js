import React, { memo, useState, useCallback } from "react";
import { TabFavIcon, TabTitle } from "./TabCard.styles";
import { focusTab } from "api/browser";
import { Toolbar } from "components/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import useContextMenu from "react-use-context-menu";
import { Text, Card, Flex, Button } from "rebass/styled-components";
import { renderInPortal } from "portal";
import { addBookmarkClicked, editBookmarksClicked } from "features/ui";
import {
  moveTabToNewWindowClicked,
  closeTabClicked,
} from "features/tabsSession";

export const TabCard = memo(({ tab, isDragging }) => {
  const [
    bindMenu,
    bindMenuItem,
    useContextTrigger,
    { isVisible, setVisible },
  ] = useContextMenu();
  const [{ onContextMenu }] = useContextTrigger({ holdToDisplay: -1 });
  const hideMenu = () => setVisible(false);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state) => state.bookmarks.byId[tab.url]);

  const handleCloseClick = useCallback(
    (e) => {
      dispatch(closeTabClicked(tab.id));
      e.stopPropagation();
    },
    [tab.id, dispatch]
  );
  const handleMoveToNewWindow = useCallback(
    (e) => {
      dispatch(moveTabToNewWindowClicked(tab.id));
      e.stopPropagation();
    },
    [tab.id, dispatch]
  );
  const handleBookmarkClick = useCallback(
    (e) => {
      dispatch(
        isBookmarked ? editBookmarksClicked(tab.id) : addBookmarkClicked(tab.id)
      );
      e.stopPropagation();
    },
    [tab.id, dispatch, isBookmarked]
  );
  return (
    <Card
      variant="tabCard"
      sx={{
        overflow: "hidden",
        userSelect: isVisible ? "none" : "auto",
        mb: 2,
      }}
      onContextMenu={onContextMenu}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => focusTab(tab)}
      isDragging={isDragging}
    >
      <TabFavIcon url={tab.url} size={2} />
      <TabTitle>{tab.title}</TabTitle>
      <Flex
        alignItems="center"
        px={2}
        sx={{
          gridColumnStart: 1,
          gridColumnEnd: 3,
        }}
      >
        <Text
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tab.url}
        </Text>
      </Flex>
      <Toolbar
        isParentHover={isHover}
        handleBookmarkClick={handleBookmarkClick}
        handleCloseClick={handleCloseClick}
        isBookmarked={isBookmarked}
        handleMoveToNewWindow={handleMoveToNewWindow}
      />

      <Menu
        bindMenu={bindMenu}
        bindMenuItem={bindMenuItem}
        hideMenu={hideMenu}
        handleBookmarkClick={handleBookmarkClick}
        handleCloseClick={handleCloseClick}
      />
    </Card>
  );
});

const Menu = ({
  bindMenu,
  bindMenuItem,
  hideMenu,
  handleBookmarkClick,
  handleCloseClick,
}) => {
  return renderInPortal(
    <Flex
      flexDirection="column"
      sx={{
        backgroundColor: "headerBg",
        color: "contrast",
      }}
      {...bindMenu}
      onClick={() => hideMenu()}
    >
      <Button
        {...bindMenuItem}
        onClick={() => (hideMenu(), handleCloseClick())}
      >
        Close Tab
      </Button>
      <Button {...bindMenuItem} onClick={handleBookmarkClick}>
        Add to Bookmarks
      </Button>
    </Flex>
  );
};
