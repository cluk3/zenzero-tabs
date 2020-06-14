import React from "react";
import { Flex } from "rebass/styled-components";

import CloseIcon from "@material-ui/icons/Close";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";

export const Toolbar = React.memo(
  ({
    handleBookmarkClick,
    handleCloseClick,
    isParentHover,
    isBookmarked,
    handleMoveToNewWindow,
  }) => {
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
        <IconButton
          onClick={handleMoveToNewWindow}
          size="small"
          aria-label="move to new window"
        >
          <OpenInNewIcon />
        </IconButton>
        <IconButton
          aria-label={isBookmarked ? "Edit bookmark" : "Add to bookmarks"}
          onClick={handleBookmarkClick}
          size="small"
        >
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        <IconButton
          aria-label="Close Tab"
          onClick={handleCloseClick}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </Flex>
    );
  }
);
