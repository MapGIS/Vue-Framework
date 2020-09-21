import { NameSpaceLayoutKey } from "../../../namespace";

export default {
  namespace: NameSpaceLayoutKey,
  state: {
    left: {

    },
    right: {
      activeKey: "right-layer-attr"
    },
    bottom: {

    },
  },
  reducers: {
    toggleLeftKey(state) {
      var newState = { ...state };
      newState.left = !newState.left;
      return newState;
    },
    toggleRightKey(state) {
      var newState = { ...state };
      newState.right = !newState.right;
      return newState;
    },
    toggleBottomKey(state) {
      var newState = { ...state };
      newState.bottom = !newState.bottom;
      return newState;
    }
  }
};
