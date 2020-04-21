import React, { useState, memo, useRef } from "react";
import { Flex, Box, Text } from "rebass/styled-components";
import { Directory } from "components/Directory";
import { motion, AnimatePresence, transform } from "framer-motion";
import { Bookmarks } from "components/Bookmarks";

import { useScroll } from "hooks";

export const SidebarView = () => {
  const [currentView, navigateTo] = useState("menu");
  return (
    <Box>
      <AnimatePresence>
        <View
          key={currentView}
          currentView={currentView}
          navigateTo={navigateTo}
        ></View>
      </AnimatePresence>
    </Box>
  );
};
const variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      easing: "easeInOut",
      delay: 0.3,
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    x: -100,
    transition: {
      easing: "easeInOut",
      delay: 0.3,
      duration: 0.5,
    },
  },
};

const ScrollBar = ({ scrollRef }) => {
  const { yPerc } = useScroll(scrollRef);
  const width = transform(yPerc, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      animate={{ width }}
      style={{
        backgroundColor: "red",
        height: "2px",
      }}
    />
  );
};
const View = memo(({ currentView, navigateTo }) => {
  const scrollRef = useRef();
  const CurrentView = viewsByState[currentView];

  return (
    <Box
      px={2}
      sx={{
        position: "absolute",
        width: "100%",
        left: "0",
        top: "0",
      }}
    >
      <ScrollBar scrollRef={scrollRef} />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        style={{
          overflowY: "scroll",
          height: "90vh",
        }}
        ref={scrollRef}
      >
        {currentView !== "menu" && (
          <h2 onClick={() => navigateTo("menu")}>{"<-- Back to menu"}</h2>
        )}
        <CurrentView navigateTo={navigateTo}></CurrentView>
      </motion.div>
    </Box>
  );
});

const Menu = memo(({ navigateTo }) => (
  <Flex flexDirection="column">
    <Text
      my={4}
      as="h2"
      sx={{ cursor: "pointer" }}
      onClick={() => navigateTo("session")}
    >
      Session
    </Text>
    <Text
      as="h2"
      sx={{ cursor: "pointer" }}
      onClick={() => navigateTo("bookmarks")}
    >
      Bookmarks
    </Text>
  </Flex>
));

const viewsByState = {
  menu: Menu,
  bookmarks: Bookmarks,
  session: Directory,
};
