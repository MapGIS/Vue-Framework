import { ILayer, LayerType } from "./baselayer";

export enum CesiumLayerType {
  Cesium3DTileset = "Cesium3DTileset",
}

export class Cesium3dTileset extends ILayer {
  constructor() {
    super();
    this.type = LayerType.Cesium3DTileset;
    this.subtype = CesiumLayerType.Cesium3DTileset;
  }
}
