import { NameSpaceMapOption } from "../../../namespace";
import { Bounds } from "../../../../map/map";

export default {
  namespace: NameSpaceMapOption,
  state: {
    print: {
      mode: "rect",
      rect: [-180, -90, 180, 90],
    },
    zoomIn: 0,
    zoomOut: 0,
    fitBounds: {
      west: -180,
      north: 90,
      east: 180,
      south: -90,
    },
    invalidate: true,
    flashTime: 500,
  },
  reducers: {
    print(state, { payload: print }) {
      var newState = { ...state, print };
      return newState;
    },
    zoomIn(state) {
      let { zoomIn } = state;
      zoomIn++;
      var newState = { ...state, zoomIn };
      return newState;
    },
    zoomOut(state) {
      let { zoomOut } = state;
      zoomOut++;
      var newState = { ...state, zoomOut };
      return newState;
    },
    fitBounds(state, { payload: fitBounds }) {
      var newState = { ...state, fitBounds };
      return newState;
    },
    invalidate(state, { payload: invalidate }) {
      var newState = { ...state, invalidate };
      return newState;
    },
    flashTime(state, { payload: flashTime }) {
      var newState = { ...state, flashTime };
      return newState;
    },
  },
};

export let actions = {
  /**
   * @function 改变底图背景
   * @param id
   * @return 触发对应的action行为，让model里面的document的reduer函数响应
   */
  toggleInvalidate(invalidate: boolean) {
    return { type: NameSpaceMapOption + "/invalidate", payload: invalidate };
  },
  toggleflashTime(flashTime: number) {
    return { type: NameSpaceMapOption + "/flashTime", payload: flashTime };
  },
  toggleZoomIn() {
    return { type: NameSpaceMapOption + "/zoomIn" };
  },
  toggleZoomOut() {
    return { type: NameSpaceMapOption + "/zoomOut" };
  },
  toggleFitBounds(bounds: Bounds) {
    return { type: NameSpaceMapOption + "/fitBounds", payload: bounds };
  },
};
