import React, { useMemo } from "react";
import { Box } from "rebass/styled-components";
import PropTypes from "prop-types";

const toPx = (n) => n + "px";

const getSharedStyles = (size) => ({
  position: "absolute",
  width: toPx(size),
  height: toPx(size / 10),
  borderRadius: toPx(size / 10),
  backgroundColor: "background",
  display: "block",
});

export const Burger = ({ isCollapsed, toggleCollapsed, size = 40 }) => {
  const sharedStyles = useMemo(() => getSharedStyles(size), [size]);
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: toPx(size),
        height: toPx(size / (5 / 3)),
      }}
      onClick={toggleCollapsed}
      onKeyDown={(event) => {
        if (event.keyCode === 13 || event.keyCode === 32) toggleCollapsed();
      }}
      role="button"
      tabIndex="0"
      aria-pressed={isCollapsed}
      aria-label="toggle sidebar"
    >
      <Box
        sx={{
          ...sharedStyles,
          top: "auto",
          bottom: "0",
          transition:
            "transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.13s",
          cursor: "pointer",
          ...(isCollapsed && {
            transform: `translate3d(0, ${toPx(-size / 4)}, 0) rotate(-45deg)`,
          }),
          "&::before": {
            ...sharedStyles,
            content: '" "',
            top: toPx(-size / 4),
            transition:
              "top 0.12s cubic-bezier(0.33333, 0.66667, 0.66667, 1) 0.2s, transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19)",
            ...(isCollapsed && {
              top: 0,
              transition:
                "top 0.1s cubic-bezier(0.33333, 0, 0.66667, 0.33333) 0.16s, transform 0.13s cubic-bezier(0.215, 0.61, 0.355, 1) 0.25s",
              transform: "rotate(-90deg)",
            }),
          },
          "&::after": {
            ...sharedStyles,
            content: '" "',
            bottom: toPx(-size / 4),
            top: toPx(-size / 2),
            transition:
              "top 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1) 0.2s, transform 0.15s ease, opacity 0.1s linear",
            ...(isCollapsed && {
              top: 0,
              transition: `top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                  opacity 0.1s linear 0.22s`,
              opacity: 0,
            }),
          },
        }}
      />
    </Box>
  );
};

Burger.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default Burger;
