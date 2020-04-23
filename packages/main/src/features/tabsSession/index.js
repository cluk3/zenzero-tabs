import { reducer as tabsReducer, actions as tabsActions } from "./tabs";
export { windowsReducer } from "./windows";
export {
  windowCreated,
  windowRemoved,
  tabCreated,
  tabRemoved,
  tabAttached,
  tabDetached,
  tabMoved,
  windowsRetrieved,
  tabDragEnded,
} from "./commonActions";
export { startDrag, endDrag, dragReducer } from "./drag"; // TODO: check if needed
export { tabsReducer };
export const { updateTab } = tabsActions;
export { windowsSelector } from "./selectors";
