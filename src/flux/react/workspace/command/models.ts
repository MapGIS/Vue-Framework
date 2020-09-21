import { NameSpaceCommand } from "../../../namespace";

export default {
  namespace: NameSpaceCommand,
  state: {
    toggleProject: false,
    toggleTransform: false,
    toggleImport: false,
    toggleExport: false,
    toggleUpload: false,
    toggleSetting: false,
    toggleSprite: false,
    toggleAddLayer: false,
    toggleAddLayerGroup: false,
    toggleSource: false,
    toggleServiceIGServer: false,
    toggleServiceIGServerX: false,
    toggleServiceExtend: false,
    toggleTopology: false,
    toggleNetwork: false,
    commandProps: {}
  },
  reducers: {
    toggleProject(state, { payload: toggleProject }) {
      var toggleTransform = false;
      var newState = { ...state, toggleProject, toggleTransform };
      return newState;
    },
    toggleImport(state, { payload: toggleImport }) {
      var newState = { ...state, toggleImport };
      return newState;
    },
    toggleExport(state, { payload: toggleExport }) {
      var newState = { ...state, toggleExport };
      return newState;
    },
    toggleUpload(state, { payload: toggleUpload }) {
      var newState = { ...state, toggleUpload };
      return newState;
    },
    toggleTransform(state, { payload: toggleTransform }) {
      var toggleProject = false;
      var newState = { ...state, toggleTransform, toggleProject };
      return newState;
    },
    toggleAddLayer(state, props) {
      let { payload } = props;
      var newState = { ...state, ...payload };
      return newState;
    },
    toggleAddLayerGroup(state, props) {
      let { payload } = props;
      var newState = { ...state, ...payload };
      return newState;
    },
    toggleAddLayerSpecial(state, props) {
      let { payload } = props;
      var newState = { ...state, ...payload };
      return newState;
    },
    toggleSetting(state, { payload: toggleSetting }) {
      var newState = { ...state, toggleSetting };
      return newState;
    },
    toggleSprite(state, { payload: toggleSprite }) {
      var newState = { ...state, toggleSprite };
      return newState;
    },
    toggleSource(state, { payload: toggleSource }) {
      var newState = { ...state, toggleSource };
      return newState;
    },
    toggleServiceExtend(state, { payload: toggleServiceExtend }) {
      var newState = { ...state, toggleServiceExtend };
      return newState;
    },
    togglePrintMilitary(state, { payload: togglePrintMilitary }) {
      var newState = { ...state, togglePrintMilitary };
      return newState;
    },
    toggleSheetPrint(state, { payload: toggleSheetPrint }) {
      var newState = { ...state, toggleSheetPrint };
      return newState;
    },
    toggleTopology(state, { payload: toggleTopology }) {
      var newState = { ...state, toggleTopology };
      return newState;
    },
    toggleNetwork(state, { payload: toggleNetwork }) {
      var newState = { ...state, toggleNetwork };
      return newState;
    }
  }
};

export let actions = {
  toggleProject(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleProject", payload: toggle };
  },
  toggleTransform(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleTransform", payload: toggle };
  },
  toggleAddLayer(toggle: Boolean, parent?: string) {
    return {
      type: NameSpaceCommand + "/toggleAddLayer",
      payload: {
        toggleAddLayer: toggle,
        commandProps: {
          parent: parent
        }
      }
    };
  },
  toggleAddLayerGroup(toggle: Boolean, parent?: string) {
    return {
      type: NameSpaceCommand + "/toggleAddLayerGroup",
      payload: {
        toggleAddLayerGroup: toggle,
        commandProps: {
          parent: parent
        }
      }
    };
  },
  toggleAddLayerSpecial(toggle: Boolean, parent?: string) {
    return {
      type: NameSpaceCommand + "/toggleAddLayerSpecial",
      payload: {
        toggleAddLayerSpecial: toggle,
        commandProps: {
          parent: parent
        }
      }
    };
  },
  toggleImport(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleImport", payload: toggle };
  },
  toggleExport(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleExport", payload: toggle };
  },
  toggleUpload(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleUpload", payload: toggle };
  },
  toggleSetting(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleSetting", payload: toggle };
  },
  toggleSprite(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleSprite", payload: toggle };
  },
  toggleSource(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleSource", payload: toggle };
  },
  toggleServiceExtend(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleServiceExtend", payload: toggle };
  },
  togglePrintMilitary(toggle: Boolean) {
    return { type: NameSpaceCommand + "/togglePrintMilitary", payload: toggle };
  },
  toggleSheetPrint(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleSheetPrint", payload: toggle };
  },
  toggleTopology(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleTopology", payload: toggle };
  },
  toggleNetwork(toggle: Boolean) {
    return { type: NameSpaceCommand + "/toggleNetwork", payload: toggle };
  }
}
