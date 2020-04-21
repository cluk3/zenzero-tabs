import React from "react";
import { Flex } from "rebass/styled-components";

export const Sidebar = ({ children, isSidebarOpen }) => {
  return (
    <Flex
      flexDirection="column"
      bg="headerBg"
      sx={{
        boxShadow: "sidebar",
        transform: `translate3d(${isSidebarOpen ? 0 : "-320px"},0,0)`,
        width: "320px",
        position: "fixed",
        height: "100vh",
        top: 6,
        transition: "transform 0.3s ease",
        zIndex: 100,
        color: "textContrast",
        contain: "content",
      }}
    >
      {children}
    </Flex>
  );
};

// export const SearchBar = () => {
//   return <div>Search...</div>;
// };
// export const Menu = () => {
//   return (
//     <Flex>
//       <Heading>Windows</Heading>
//       <Heading>Sessions</Heading>
//       <Heading>Bookmarks</Heading>
//       <Heading>Config</Heading>
//     </Flex>
//   );
// };
