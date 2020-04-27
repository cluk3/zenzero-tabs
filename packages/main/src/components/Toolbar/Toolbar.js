import React from "react";
import { Flex, Button } from "rebass/styled-components";
import { ReactComponent as CloseIcon } from "icons/close-24px.svg";
import { ReactComponent as BookmarkIcon } from "icons/bookmark.svg";

export const Toolbar = React.memo(
  ({ handleBookmarkClick, handleCloseClick, isParentHover, isBookmarked }) => {
    return (
      <Flex
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: isParentHover ? 1 : 0,
          transition: "opacity .2s ease",
          ":focus-within": {
            opacity: 1,
          },
          backgroundColor: "hsla(39, 4%, 62%, 0.2)",
        }}
      >
        <Button
          variant="toolbar"
          sx={{
            transform: "translateY(-5px)",
            transition: "transform .5s ease",
            ":hover": {
              transform: "translateY(-2px)",
            },
            polyline: {
              fill: isBookmarked ? "yellow" : "transparent",
              transition: "fill 0.3s ease",
            },
          }}
          title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          onClick={handleBookmarkClick}
        >
          <BookmarkIcon />
        </Button>
        <Button
          variant="toolbar"
          sx={{
            py: 0,
            transition: "transform 0.2s ease",

            ":hover": {
              transform: "scale(1.2)",
              color: "red",
            },
          }}
          onClick={handleCloseClick}
        >
          <CloseIcon />
        </Button>
      </Flex>
    );
  }
);
