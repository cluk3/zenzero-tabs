import React, { useState, useEffect, memo } from "react";
import { Tree } from "components/Tree";
import browser from "webextension-polyfill";
import { Box, Flex, Image, Text } from "rebass";
import { getFaviconUrl } from "api/browser";

export const Bookmarks = memo(() => {
  const [bookmarks, setBookmarks] = useState(null);
  useEffect(() => {
    browser.bookmarks.getTree().then((t) => setBookmarks(t[0]));
  }, []);
  console.debug("bookmarks", bookmarks);
  return (
    <>
      {bookmarks ? (
        <>
          <RecursiveTree bookmark={bookmarks}></RecursiveTree>
          <Box height={60} />
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
});

export const RecursiveTree = ({ bookmark }) => {
  return (
    <Box sx={{}}>
      {bookmark.children ? (
        bookmark.children.length ? (
          <Tree defaultOpen name={bookmark.title || "Bookmarks"}>
            {bookmark.children.map((b) => {
              return <RecursiveTree key={b.id} bookmark={b}></RecursiveTree>;
            })}
          </Tree>
        ) : (
          <Box color="yellow" py={2}>
            Empty folder
          </Box>
        )
      ) : (
        <Box
          py={2}
          sx={{
            whiteSpace: "nowrap",
            overflowX: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          - {bookmark.title}
        </Box>
      )}
    </Box>
  );
};

const BookmarkEntry = ({ bookmark, isDragging, isOver }) => {
  return (
    <Flex
      alignItems="start"
      my={2}
      ml={3}
      sx={{ opacity: isDragging ? 0.1 : 1 }}
    >
      <Image
        sx={{
          flex: "0 0 16px",
        }}
        width="16px"
        height="16px"
        src={getFaviconUrl(bookmark.url)}
      ></Image>
      <Flex ml={2} flexDirection="column" justifyContent="center">
        <Text
          mt="-2px"
          mb="6px"
          sx={{
            flex: "1 0",
            fontWeight: "bold",
          }}
        >
          {tab.title}
        </Text>
        <Text
          sx={{
            flex: "1 0",
            color: "contrast",
          }}
        >
          {tab.url}
        </Text>
      </Flex>
    </Flex>
  );
};
