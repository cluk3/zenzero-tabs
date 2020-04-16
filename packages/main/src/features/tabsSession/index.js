import { reducer as windowsReducer } from "./windows";
import { reducer as tabsReducer, actions as tabsActions } from "./tabs";
export {
  addWindow,
  addWindows,
  removeWindow,
  addTab,
  removeTab,
  attachTab,
  detachTab,
  moveTab,
} from "./commonActions";
export { startDrag, endDrag, dragReducer } from "./drag";
export { tabsReducer, windowsReducer };
export const { updateTab } = tabsActions;
