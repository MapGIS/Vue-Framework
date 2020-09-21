import { NameSpaceLayoutState } from "../../../namespace";

export default {
  namespace: NameSpaceLayoutState,
  state: {
    left: true,
    right: false,
    bottom: false,
    toolbar: ["basic", "vectortile", "rastertile"],
  },
  reducers: {
    toggleLeftLayout(state) {
      var newState = { ...state };
      newState.left = !newState.left;
      return newState;
    },
    toggleRightLayout(state) {
      var newState = { ...state };
      newState.right = !newState.right;
      return newState;
    },
    toggleBottomLayout(state) {
      var newState = { ...state };
      newState.bottom = !newState.bottom;
      return newState;
    }
  }
};

export let actions = {
  toggleLeftLayout(toggle: Boolean) {
    return {
      type: NameSpaceLayoutState + "/toggleLeftLayout"
      //payload: toggle
    };
  },

  toggleRightLayout(toggle: Boolean) {
    return {
      type: NameSpaceLayoutState + "/toggleRightLayout"
      //payload: toggle
    };
  },

  toggleBottomLayout(toggle: Boolean) {
    return {
      type: NameSpaceLayoutState + "/toggleBottomLayout"
      //payload: toggle
    };
  }
}
