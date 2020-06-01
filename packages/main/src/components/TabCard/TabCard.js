import React, { memo, useState, useCallback } from "react";
import { TabFavIcon, TabTitle } from "./TabCard.styles";
import { focusTab, getFaviconUrl } from "api/browser";
import { Toolbar } from "components/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkButtonClicked } from "features/bookmarks";
import useContextMenu from "react-use-context-menu";
import { Text, Card, Flex, Button } from "rebass/styled-components";
import { renderInPortal } from "portal";

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
  const isBookmarked_ = useSelector((state) => false); //!!state.bookmarks.byUrl[tabUrl]
  const [isBookmarked, setisBookmarked] = useState(false);
  const handleCloseClick = useCallback(
    (e) => {
      dispatch({ type: "CLOSE_TAB_CLICKED", payload: { tabId: tab.id } });
      e.stopPropagation();
    },
    [tab.id]
  );
  const handleBookmarkClick = useCallback(
    (e) => {
      // dispatch(bookmarkButtonClicked(tab.id, isBookmarked));
      setisBookmarked((b) => !b);
      e.stopPropagation();
    },
    [tab.id, dispatch, setisBookmarked]
  );
  return (
    <Card
      variant="tabCard"
      sx={{
        overflow: "hidden",
        transition: "transform 0.2s ease-out",
        willChange: "transform",
        userSelect: isVisible ? "none" : "auto",
        mb: 2,

        ":hover": {
          boxShadow: "cardHover",
          transform: "translate3d(1px, 1px, 0) ",
        },
      }}
      onContextMenu={onContextMenu}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => focusTab(tab)}
      isDragging={isDragging}
    >
      <TabFavIcon src={getFaviconUrl(tab.url)} alt="tab favicon" />
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
