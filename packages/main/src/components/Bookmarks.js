import { Tree } from "components/Tree";
import { Flex, Text } from "rebass";
import { TabFavicon } from "./TabFavicon";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import React, { useCallback, memo } from "react";
import { map } from "ramda";
import { openBookmarkInWindow } from "features/bookmarks";

const getCategoriesFolder = createSelector(
  ({ categories }) => categories,
  ({ bookmarks }) => bookmarks.byId,
  (categories, bookmarks) =>
    map((categoryId) => {
      return [
        categoryId,
        categories.byId[categoryId].bookmarks.map((bookmarkId) => ({
          ...bookmarks[bookmarkId],
          url: bookmarkId,
        })),
      ];
    }, categories.allIds)
);
export const Bookmarks = memo(() => {
  const categories = useSelector(getCategoriesFolder);
  const dispatch = useDispatch();

  const handleBookmarkClick = useCallback(
    (bookmarkUrl) => () => {
      dispatch(openBookmarkInWindow(bookmarkUrl));
    },
    [dispatch]
  );

  return (
    <>
      {categories.length ? (
        <>
          {categories.map(([categoryName, bookmarks]) => {
            return (
              <Tree name={categoryName} key={categoryName}>
                {bookmarks.map((b) => {
                  return (
                    <BookmarkEntry
                      key={categoryName + b.url}
                      bookmark={b}
                      handleBookmarkClick={handleBookmarkClick}
                    />
                  );
                })}
              </Tree>
            );
          })}
        </>
      ) : (
        <h3>Nothing in here... ¯\_(ツ)_/¯</h3>
      )}
    </>
  );
});

export const BookmarkEntry = memo(({ bookmark, handleBookmarkClick }) => {
  return (
    <Flex
      alignItems="start"
      my={2}
      ml={3}
      onClick={handleBookmarkClick(bookmark.url)}
      sx={{
        cursor: "pointer",
      }}
    >
      <TabFavicon url={bookmark.url}></TabFavicon>
      <Flex ml={2} flexDirection="column" justifyContent="center">
        <Text
          mt="-2px"
          mb="6px"
          sx={{
            flex: "1 0",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {bookmark.title}
        </Text>
        <Text
          sx={{
            flex: "1 0",
            color: "contrast",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {bookmark.url}
        </Text>
      </Flex>
    </Flex>
  );
});
