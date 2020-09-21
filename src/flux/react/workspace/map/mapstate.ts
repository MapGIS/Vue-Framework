import { NameSpaceMapState } from "../../../namespace";

const defaultMapState = {
  zoom: 0,
  center: [0, 0],
  bbox: [-180, 90, 180, -90],
  extent: [-180, 90, 180, -90],
  scale: 0,
  bounds: {
    west: -180,
    north: 90,
    east: 180,
    south: -90,
  },
  mousePosition: [0, 0, 0],
  viewState: "query",
  editState: "simple_select",
  highLight: "none",
  enableEventLink: false,
  enableZoom: false,
};

export default {
  namespace: NameSpaceMapState,
  state: {
    ...defaultMapState,
    selectedLayerIndex: 0,
    selectedLayer: {},
  },
  reducers: {
    center(state, { payload: center }) {
      var newState = { ...state, center };
      return newState;
    },
    zoom(state, { payload: zoom }) {
      var newState = { ...state, zoom };
      return newState;
    },
    scale(state, { payload: scale }) {
      var newState = { ...state, scale };
      return newState;
    },
    bearing(state, { payload: bearing }) {
      var newState = { ...state, bearing };
      return newState;
    },
    pitch(state, { payload: pitch }) {
      var newState = { ...state, pitch };
      return newState;
    },
    mousePosition(state, { payload: mousePosition }) {
      var newState = { ...state, mousePosition };
      return newState;
    },
    selectedLayerIndex(state, { payload: selectedLayerIndex }) {
      var newState = { ...state, selectedLayerIndex };
      return newState;
    },
    selectedLayer(state, { payload: selectedLayer }) {
      var newState = { ...state, selectedLayer };
      return newState;
    },
    viewState(state, { payload: viewState }) {
      var newState = { ...state, viewState };
      return newState;
    },
    editState(state, { payload: editState }) {
      var newState = { ...state, editState };
      return newState;
    },
    highLight(state, { payload: highLight }) {
      var newState = { ...state, highLight };
      return newState;
    },
    enableEventLink(state, { payload: enableEventLink }) {
      var newState = { ...state, enableEventLink };
      return newState;
    },
    enableZoom(state, { payload: enableZoom }) {
      var newState = { ...state, enableZoom };
      return newState;
    },
  },
};

export let actions = {
  /**
   * @function 发送地图中心
   * @param center Array<number>
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleCenter(center) {
    return {
      type: NameSpaceMapState + "/center",
      payload: center,
    };
  },
  /**
   * @function 发送鼠标位置
   * @param mousePosition
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleMousePosition(mousePosition) {
    return {
      type: NameSpaceMapState + "/mousePosition",
      payload: mousePosition,
    };
  },

  /**
   * @function 发送当前级别
   * @param level
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleZoomLevel(zoom) {
    return {
      type: NameSpaceMapState + "/zoom",
      payload: zoom,
    };
  },

  /**
   * @function 发送当前比例尺
   * @param scalse
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleScale(scale) {
    return {
      type: NameSpaceMapState + "/scale",
      payload: scale,
    };
  },

  /**
   * @function 发送当前指北朝向
   * @param scalse
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleBearing(bearing) {
    return {
      type: NameSpaceMapState + "/bearing",
      payload: bearing,
    };
  },

  /**
   * @function 发送当前相机视角
   * @param scalse
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  togglePitch(pitch) {
    return {
      type: NameSpaceMapState + "/pitch",
      payload: pitch,
    };
  },

  /**
   * @function 改变当前地图状态
   * @param mapState
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleViewState(mapState) {
    return {
      type: NameSpaceMapState + "/viewState",
      payload: mapState,
    };
  },

  /**
   * @function 改变当前编辑状态
   * @param mapState
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleEditState(editState) {
    return {
      type: NameSpaceMapState + "/editState",
      payload: editState,
    };
  },

  /**
   * @function 改变当前地图高亮模式
   * @param highLight
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleHighLight(highLight) {
    return {
      type: NameSpaceMapState + "/highLight",
      payload: highLight,
    };
  },

  /**
   * @function 改变当前地图事件绑定模式，true激活所有的事件联动，这个主要用于专业制图，很耗性能
   * @param enable
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleEnableEventLink(enable) {
    return {
      type: NameSpaceMapState + "/enableEventLink",
      payload: enable,
    };
  },

  /**
   * @function 改变当前地图缩放事件监听
   * @param enable
   * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
   */
  toggleEnableZoom(enable) {
    return {
      type: NameSpaceMapState + "/enableZoom",
      payload: enable,
    };
  },
};
