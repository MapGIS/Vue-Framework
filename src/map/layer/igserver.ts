export enum IgsLayerType {
  /**IGServer图层 */
  IgsDocLayer = "IgsDocLayer",
  IgsTileLayer = "IgsTileLayer",
  IgsVectorLayer = "IgsVectorLayer",
  IgsWmsLayer = "IgsWmsLayer",
  IgsWmtsLayer = "IgsWmtsLayer"
}

export let IgsLayerTypeDefine = {
  /**IGServer图层 */
  IgsDocLayer: { type: "raster", subtype: "IgsDocLayer", name: "地图文档" },
  IgsTileLayer: { type: "raster", subtype: "IgsTileLayer", name: "栅格瓦片" },
  IgsVectorLayer: {
    type: "raster",
    subtype: "IgsVectorLayer",
    name: "矢量图层"
  },
  IgsWmsLayer: { type: "raster", subtype: "IgsWmsLayer", name: "WMS服务" },
  IgsWmtsLayer: { type: "raster", subtype: "IgsWmtsLayer", name: "WMTS服务" }
};
