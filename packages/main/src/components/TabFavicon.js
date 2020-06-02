import React from "react";
import { getFaviconUrl } from "api/browser";
import { Image } from "rebass/styled-components";

export const TabFavicon = ({ url, size = 1, className }) => {
  return (
    <Image
      className={className}
      sx={{
        flex: `0 0 ${size}rem`,
      }}
      width={`${size}rem`}
      height={`${size}rem`}
      alt={`${url} favicon`}
      src={getFaviconUrl(url, 16 * size)}
    ></Image>
  );
};
