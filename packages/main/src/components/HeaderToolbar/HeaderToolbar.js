import React, { useCallback } from "react";
import { Flex } from "rebass/styled-components";

import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import IconButton from "@material-ui/core/IconButton";
import { dedupTabsClicked } from "features/tabsSession";
import { useDispatch } from "react-redux";

export const HeaderToolbar = React.memo(() => {
  const dispatch = useDispatch();
  const handleDedupClick = useCallback(() => {
    dispatch(dedupTabsClicked());
  }, [dispatch]);
  return (
    <Flex>
      <IconButton onClick={handleDedupClick} aria-label="Deduplicate">
        <DeleteSweepIcon color="primary" />
      </IconButton>
    </Flex>
  );
});
