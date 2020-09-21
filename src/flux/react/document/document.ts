import { NameSpaceDocument } from "../../namespace";
import { getBackground } from "../../../map/config/backgroud";

import {
  IDocument,
  defaultDocument,
  Current,
  MapRender,
} from "../../../map/document";
import { Bounds } from "../../../map/map";
import {
  ILayer,
  ILayout,
  changeLayerName,
  changeLayerId,
  changeLayersVisible,
} from "../../../map/layer/baselayer";
import {
  changeRasterTileStyle,
  changeRasterTileLayout,
  RasterTileLayout,
} from "../../../map/layer/rastertile";
import {
  VectorTileType,
  changeVectorTileStyle,
  changeVectorTileLayout,
  changeVectorTileFilter,
  changeVectorTileType,
  changeVectorTileBase,
  changeVectorTileZoom,
} from "../../../map/vectortile/baselayer";

/**
 * @namespace @mapgis/document
 * @description 提取出高度抽象的对外透明的常见行为
 */
export let State = {
  namespace: NameSpaceDocument,
  state: defaultDocument,
  reducers: {
    resetDocument(state, { payload: document }) {
      var newState = document; /* {
        name: document.name,
        maprender: document.maprender,
        current: defaultCurrent,
        sources: document.sources,
        backgrounds: document.backgrounds,
        layers: document.layers,
        sprite: document.sprite,
        glyphs: document.glyphs
      }; */
      return newState;
    },
    current(state, { payload: current }) {
      var newState = { ...state, current };
      return newState;
    },
    maprender(state, { payload: maprender }) {
      var newState = { ...state, maprender };
      return newState;
    },
    sources(state, { payload: sources }) {
      var newState = { ...state, sources };
      return newState;
    },
    bounds(state, { payload: bounds }) {
      var newState = { ...state, bounds };
      return newState;
    },
    layers(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    addLayer(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    specialLayer(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    addLayerGroup(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    deleteLayer(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    layerName(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    changeLayersVisible(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    changeBackgroud(state, { payload: backgrounds }) {
      var newState = { ...state, backgrounds };
      return newState;
    },
    changeBackgroundStyle(state, { payload: backgrounds }) {
      var newState = { ...state, backgrounds };
      return newState;
    },
    changeBackgroundLayout(state, { payload: backgrounds }) {
      var newState = { ...state, backgrounds };
      return newState;
    },
    changeRasterTileStyle(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    changeRasterTileLayout(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    changeDemWMSLayout(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    },
    changeDemWMSInfo(state, { payload: layers }) {
      var newState = { ...state, layers };
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
  toggleBackgroud(id: string) {
    let backgrounds = [getBackground(id)];
    return {
      type: NameSpaceDocument + "/changeBackgroud",
      payload: backgrounds,
    };
  },
  resetDocument(document: IDocument) {
    return { type: NameSpaceDocument + "/resetDocument", payload: document };
  },
  resetMapRender(maprender: MapRender) {
    return { type: NameSpaceDocument + "/maprender", payload: maprender };
  },
  resetSources(sources: Object) {
    return { type: NameSpaceDocument + "/sources", payload: sources };
  },
  toggleBounds(bounds: Bounds) {
    return { type: NameSpaceDocument + "/bounds", payload: bounds };
  },
  /**
   * @function 改变当前选中
   * @param id 对应唯一的键值
   * @return 触发对应的action行为，让model里面的document的reduer函数响应
   */
  toggleCurrent(id: string, document: IDocument) {
    let current: Current = document.changeCurrent(id);
    return { type: NameSpaceDocument + "/current", payload: current };
  },
  updateLayers(layers: Array<ILayer>) {
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
  addLayer(layer: ILayer, parent, document: IDocument) {
    let doc = IDocument.clone(document);
    let layers = doc.addLayerInGroup(layer, parent);
    return { type: NameSpaceDocument + "/addLayer", payload: layers };
  },
  addLayerGroup(layer: ILayer, parent, document: IDocument) {
    let layers = changeLayerName(layer, name, document);
    return { type: NameSpaceDocument + "/addLayerGroup", payload: layers };
  },
  copyLayer(id: string, document: IDocument) {
    let doc = IDocument.clone(document);
    let layers = doc.copyLayer(id);
    return { type: NameSpaceDocument + "/addLayer", payload: layers };
  },
  specialLayer(id: string, document: IDocument, type: string) {
    let doc = IDocument.clone(document);
    let layers = doc.specialLayer(id, type);
    return { type: NameSpaceDocument + "/specialLayer", payload: layers };
  },
  deleteLayer(id: string, document: IDocument) {
    let doc = IDocument.clone(document);
    let layers = doc.deleteLayer(id);
    return { type: NameSpaceDocument + "/deleteLayer", payload: layers };
  },
  toggleLayerName(layer: ILayer, name: string, document: IDocument) {
    let layers = changeLayerName(layer, name, document);
    return { type: NameSpaceDocument + "/layerName", payload: layers };
  },
  toggleLayerId(layer: ILayer, id: string, document: IDocument) {
    let layers = changeLayerId(layer, id, document);
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
  toggleLayersVisible(visibleIds: Array<string>, document: IDocument) {
    let layers = changeLayersVisible(visibleIds, document);
    return {
      type: NameSpaceDocument + "/changeLayersVisible",
      payload: layers,
    };
  },
  toggleRasterTileStyle(raster: ILayer, style: any, document: IDocument) {
    let layers = changeRasterTileStyle(raster, style, document);
    return {
      type: NameSpaceDocument + "/changeRasterTileStyle",
      payload: layers,
    };
  },
  toggleRasterTileLayout(
    raster: ILayer,
    layout: RasterTileLayout,
    document: IDocument
  ) {
    let layers = changeRasterTileLayout(raster, layout, document);
    return {
      type: NameSpaceDocument + "/changeRasterTileLayout",
      payload: layers,
    };
  },
  toggleVectorTileStyle(vector: ILayer, style: any, document: IDocument) {
    let layers = changeVectorTileStyle(vector, style, document);
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
  toggleVectorTileLayout(vector: ILayer, layout: any, document: IDocument) {
    let layers = changeVectorTileLayout(vector, layout, document);
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
  toggleVectorTileFilter(vector: ILayer, filter: any, document: IDocument) {
    let layers = changeVectorTileFilter(vector, filter, document);
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
  toggleVectorTileType(
    vector: ILayer,
    type: VectorTileType,
    document: IDocument
  ) {
    let layers = changeVectorTileType(vector, type, document);
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
  toggleVectorTileBase(vector: ILayer, base: any, document: IDocument) {
    let layers = changeVectorTileBase(vector, base, document);
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
  toggleVectorTileZoom(
    vector: ILayer,
    minZoom: number,
    maxZoom: number,
    document: IDocument
  ) {
    let layers = changeVectorTileZoom(vector, minZoom, maxZoom, document);
    return { type: NameSpaceDocument + "/layers", payload: layers };
  },
};

export default State;
