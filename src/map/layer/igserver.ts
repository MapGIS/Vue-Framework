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
    IgsDocLayer: { type: "raster", name: "地图文档" },
    IgsTileLayer: { type: "raster", name: "栅格瓦片" },
    IgsVectorLayer: { type: "raster", name: "矢量图层" },
    IgsWmsLayer: { type: "raster", name: "WMS服务" },
    IgsWmtsLayer: { type: "raster", name: "WMTS服务" }
}