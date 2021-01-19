import { IDocument, MapRender } from "../document";
import { Bounds, Position } from "../map";
import { Crs } from "../crs";
import { deepEqual } from "../../utils/deepequal";

export const defaultId: string = "unknow";

export enum LayerType {
    /**通用图层 */
    GroupLayer = "GroupLayer",
    BackGround = "BackGround",
    BackColor = "BackColor",
    RasterTile = "RasterTile",
    VectorTile = "VectorTile",
    GeoJSON = "GeoJSON",
    ShapeFile = "ShapeFile",
    KML = "KML",
    KMZ = "KMZ",
    OverLayer = "OverLayer",

    /**
     * 三维图层
     */
    M3D = "M3D",
    Cesium3DTileset = "Cesium3DTileset",
    CesiumLanguage = "CesiumLanguage",
    PointCloud = "PointCloud",
    Terrain = "Terrain",

    /**
     * 通用覆盖图层
     */
    EchartsLayer = "EchartsLayer",
    MapvLayer = "MapvLayer",
    SpaceTimeAggregationLayer = "SpaceTimeAggregationLayer",

    /**
     * 移动端
     */
    MBTiles = "MBTiles",

    /**
     * 故事图层
     */
    BookLayer = "BookLayer",


    /**
     * 未知图层
     */
    UnKnow = "UnKnow",
}

export enum SubLayerType {
    // 二维图层
    // 栅格瓦片
    // 栅格瓦片 - igserver
    IgsDocLayer = "IgsDocLayer",
    IgsTileLayer = "IgsTileLayer",
    IgsVectorLayer = "IgsVectorLayer",
    // 栅格瓦片 - 其他厂商
    RasterBaiduLayer = "RasterBaiduLayer",
    RasterGaodeLayer = "RasterGaodeLayer",
    RasterGoogleLayer = "RasterGoogleLayer",
    RasterOpenweatherLayer = "RasterOpenweatherLayer",
    RasterTiandituLayer = "RasterTiandituLayer",
    RasterArcgisLayer = "RasterArcgisLayer",
    // 栅格瓦片 - OGC
    OgcWmsLayer = "OgcWmsLayer",
    OgcWmtsLayer = "OgcWmtsLayer",
    // 实时渲染
    QuikeDisplayVectorTile = "QuikeDisplayVectorTile",
    QuikeDisplayRasterTile = "QuikeDisplayRasterTile",

    // 三维图层
    // 三维图层 - igserver
    IgsDoc3dLayer = "IgsDoc3dLayer",
    IgsTile3dLayer = "IgsTile3dLayer"
}

export enum LayerGroup {
    Common = "通用图层",
    Three = "三维图层",
    Overlay = "覆盖图层",
}

export let LayerDefine = {
    /**通用图层 */
    GroupLayer: {
        type: LayerType.GroupLayer,
        group: LayerGroup.Common,
        name: "组图层",
    },
    BackGround: {
        type: LayerType.BackGround,
        group: LayerGroup.Common,
        name: "背景底图",
    },
    BackColor: {
        type: LayerType.BackColor,
        group: LayerGroup.Common,
        name: "背景颜色",
    },
    RasterTile: {
        type: LayerType.RasterTile,
        group: LayerGroup.Common,
        name: "栅格瓦片",
    },
    VectorTile: {
        type: LayerType.VectorTile,
        group: LayerGroup.Common,
        name: "矢量瓦片",
    },
    GeoJSON: {
        type: LayerType.GeoJSON,
        group: LayerGroup.Common,
        name: "GeoJSON",
    },
    ShapeFile: {
        type: LayerType.ShapeFile,
        group: LayerGroup.Common,
        name: "ShapeFile",
    },
    KML: {
        type: LayerType.KML,
        group: LayerGroup.Common,
        name: "KML",
    },
    KMZ: {
        type: LayerType.KMZ,
        group: LayerGroup.Common,
        name: "KMZ",
    },
    OverLayer: {
        type: LayerType.OverLayer,
        group: LayerGroup.Common,
        name: "OverLayer",
    },
    /**
     * 三维图层
     */
    M3D: {
        type: LayerType.M3D,
        group: LayerGroup.Three,
        name: "M3D",
    },
    Cesium3DTileset: {
        type: LayerType.Cesium3DTileset,
        group: LayerGroup.Three,
        name: "3D瓦片",
    },
    CesiumLanguage: {
        type: LayerType.CesiumLanguage,
        group: LayerGroup.Three,
        name: "CZML",
    },
    PointCloud: {
        type: LayerType.PointCloud,
        group: LayerGroup.Three,
        name: "点云",
    },
    Terrain: {
        type: LayerType.Terrain,
        group: LayerGroup.Three,
        name: "地形",
    },
    /**
     * 通用覆盖图层
     */
    EchartsLayer: {
        type: LayerType.EchartsLayer,
        group: LayerGroup.Overlay,
        name: "Echarts图层",
    },
    MapvLayer: {
        type: LayerType.MapvLayer,
        group: LayerGroup.Overlay,
        name: "Mapv图层",
    },
    SpaceTimeAggregationLayer: {
        type: LayerType.SpaceTimeAggregationLayer,
        group: LayerGroup.Overlay,
        name: "时空聚合图层",
    },
    /**
     * 故事图层
     */
    BookLayer: {
        type: LayerType.BookLayer,
        group: LayerGroup.Common,
        name: "BookLayer",
    },
    /**
     * 未知图层
     */
    UnKnow: { type: LayerType.UnKnow, group: LayerGroup.Common, name: "未知" },
};

export let SubLayerDefine = {
    // 二维图层
    // 栅格瓦片
    // 栅格瓦片 - igserver
    IgsDocLayer: {
        type: "raster",
        subtype: SubLayerType.IgsDocLayer,
        group: LayerGroup.Common,
        name: "地图文档图层",
    },
    IgsTileLayer: {
        type: "raster",
        subtype: SubLayerType.IgsTileLayer,
        group: LayerGroup.Common,
        name: "地图瓦片图层",
    },
    IgsVectorLayer: {
        type: "raster",
        subtype: SubLayerType.IgsVectorLayer,
        group: LayerGroup.Common,
        name: "地图矢量图层",
    },
    // 栅格瓦片 - 其他厂商
    RasterBaiduLayer: {
        type: "raster",
        subtype: SubLayerType.RasterBaiduLayer,
        group: LayerGroup.Common,
        name: "栅格百度瓦片",
    },
    RasterGaodeLayer: {
        type: "raster",
        subtype: SubLayerType.RasterGaodeLayer,
        group: LayerGroup.Common,
        name: "栅格高德瓦片",
    },
    RasterGoogleLayer: {
        type: "raster",
        subtype: SubLayerType.RasterGoogleLayer,
        group: LayerGroup.Common,
        name: "栅格谷歌瓦片",
    },
    RasterOpenweatherLayer: {
        type: "raster",
        subtype: SubLayerType.RasterOpenweatherLayer,
        group: LayerGroup.Common,
        name: "栅格开放天气瓦片",
    },
    RasterTiandituLayer: {
        type: "raster",
        subtype: SubLayerType.RasterTiandituLayer,
        group: LayerGroup.Common,
        name: "栅格天地图瓦片",
    },
    RasterArcgisLayer: {
        type: "raster",
        subtype: SubLayerType.RasterArcgisLayer,
        group: LayerGroup.Common,
        name: "栅格ArcGIS瓦片",
    },
    // 栅格瓦片 - OGC
    OgcWmsLayer: {
        type: "raster",
        subtype: SubLayerType.OgcWmsLayer,
        group: LayerGroup.Common,
        name: "栅格WMS瓦片",
    },
    OgcWmtsLayer: {
        type: "raster",
        subtype: SubLayerType.OgcWmtsLayer,
        group: LayerGroup.Common,
        name: "栅格WMTS瓦片",
    },
    // 三维图层
    // 三维图层 - igserver
    IgsDoc3dLayer: {
        type: "raster",
        subtype: SubLayerType.IgsDoc3dLayer,
        group: LayerGroup.Common,
        name: "三维地图文档图层",
    },
    IgsTile3dLayer: {
        type: "raster",
        subtype: SubLayerType.IgsTile3dLayer,
        group: LayerGroup.Common,
        name: "三维地图瓦片图层",
    },
};

export class IMetadata {
    crs: Crs;
    topleftcorner: Position;
    tilematrixset: Array<String | Number>;

    constructor() {
        this.crs = new Crs();
        this.topleftcorner = [-180, 90];
        this.tilematrixset = new Array(20).fill("").map((item, index) => index);
    }
}

export class ILayer {
    type: LayerType;
    name: string;
    id: string;
    key: string;

    description?: string;
    
    /**
     * @member UI框架用来进行文字绑定的关键字与name一致即可
     */
    title?: string;

    /**
     * @member 地图url
     */
    url?: string;

    /**
     * @member 元数据信息
     */
    metadata?: IMetadata;
    filter?: IFilter;
    layout?: ILayout;
    style?: IStyle;
    info?: IInfo;
    /**
     * @member 表示font图标，和iconfont强绑定
     */
    icon?: string;
    children?: Array<ILayer>;
    subtype?: any;
    bounds?: Bounds;

    constructor(l?: ILayer) {
        if (!l) return;
        if (l.subtype) this.subtype = l.subtype;

        let id = l.id || l.name || l.title || l.key;

        if (l.children) this.children = l.children;
        if (l.url) this.url = l.url;

        this.name = id;
        this.title = id;
        this.id = id;
        this.key = id;

        if (l.style) this.style = l.style;
        if (l.layout) this.layout = l.layout;
    }

    changeLayerName?(layer: ILayer, name: string, document: IDocument) {
        let layers = document.layers;
        if (!layers) return undefined;

        layers.map((item) => {
            if (item.type == LayerType.GroupLayer) {
                if (item.children) {
                    this.loopGroupName(layer.id, name, item);
                }
            } else {
                if (item.name == layer.name) {
                    item.title = item.name = name;
                }
            }
        });

        return layers;
    }

    changeSelfVisible?(visible: boolean) {
        if (!this.layout) {
            this.layout = { visible: visible };
        } else {
            this.layout = {
                ...this.layout,
                visible: visible,
            };
        }
    }

    loopGroupName?(id, name, group) {
        if (group.id == id) {
            if (group && group["name"]) group["name"] = name;
            if (group && group["title"]) group["title"] = name;
        }
        if (group.type != LayerType.GroupLayer) {
            return group;
        }
        if (group.children) {
            group.children.map((child) => {
                if (child.type == LayerType.GroupLayer) {
                    child = loopGroupName(id, name, child);
                } else {
                    if (child.id == id) {
                        if (child && child.name !== undefined) child.name = name;
                        if (child && child.title !== undefined) child.title = name;
                    }
                }
            });
        }
        return group;
    }
}

export interface ICommonAction {
    dispatchNameChange(layer: ILayer, name: string, doc: IDocument);
    handleNameChange(name: string);
}

export class IInfo {}

export class IStyle {}

export class IFilter {}

export class ILayout {
    visible?: boolean;
}

/**
 * @description 这里针对非组图层的最小图层单元进行对应的属性修改操作
 * @param layer 对应图层
 * @param property 图层属性
 * @param value 新的值
 */
export function changeLayerProperty(layer, property, value) {
    return {
        ...layer,
        [property]: value,
    };
}

/**
 * @description 这个和document里面的区别在于document是存在组图层的，
 * 即按照各自的业务组织的，这里是直接遍历对应地图引擎的地图图层，
 * 与业务无关，所以放在layer这里
 * @param map 对应的地图容器
 * @param id 对应的图层id
 * @param render 对应的地图引擎
 */
export function getLayerById(map, id: string, render: MapRender) {
    let ids = [];
    if (render == MapRender.MapBoxGL) {
        const { layers } = map.getStyle();

        if (layers) {
            ids = layers.filter((layer) => layer.id === id);
        }
    }
    return ids;
}

export function changeLayerName(
    layer: ILayer,
    name: string,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers.map((item) => {
        if (item.type == LayerType.GroupLayer) {
            if (item.children) {
                loopGroupName(layer.id, name, item);
            }
        } else {
            if (item.name == layer.name) {
                item.title = item.name = name;
            }
        }
    });

    return layers;
}

export function changeSelfVisible(layer, visible) {
    if (!layer.layout) {
        layer.layout = { visible: visible };
    } else {
        layer.layout = {
            ...layer.layout,
            visible: visible,
        };
    }
    return layer;
}

export function changeLayerId(layer: ILayer, id: string, document: IDocument) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers.map((item) => {
        if (item.type == LayerType.GroupLayer) {
            if (item.children) {
                loopGroupId(layer.id, id, item);
            }
        } else {
            if (item.id == layer.id) {
                item.title = item.id = id;
            }
        }
    });

    return layers;
}

export function checkLayerVisible(visibleIds: Array<string>, id: string) {
    for (var i = 0; i < visibleIds.length; i++) {
        let visibleId = visibleIds[i];
        if (id == visibleId) return true;
    }
    return false;
}

export function changeLayersVisible(
    visibleIds: Array<string>,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers = layers.map((layer) => {
        if (layer.type == LayerType.GroupLayer || layer.children) {
            if (layer.children) {
                if (checkLayerVisible(visibleIds, layer.id)) {
                    layer.layout = { visible: true };
                } else {
                    layer.layout = { visible: false };
                }
                loopGroupVisible(visibleIds, layer);
            }
        } else {
            if (!layer.layout) layer.layout = new ILayout();
            layer.layout.visible = false;
            visibleIds.forEach((id) => {
                if (id == layer.id) {
                    layer.layout.visible = true;
                }
            });
        }
        return layer;
    });

    // console.log("changelayervisible", visibleIds, layers);

    return layers;
}

function loopGroupName(id, name, group) {
    if (group.id == id) {
        if (group && group["name"]) group["name"] = name;
        if (group && group["title"]) group["title"] = name;
    }
    if (group.type != LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type == LayerType.GroupLayer) {
                child = loopGroupName(id, name, child);
            } else {
                if (child.id == id) {
                    if (child && child.name !== undefined) child.name = name;
                    if (child && child.title !== undefined) child.title = name;
                }
            }
        });
    }
    return group;
}

function loopGroupId(id, newid, group) {
    if (group.id == id) {
        if (group && group["id"]) group["id"] = newid;
        if (group && group["title"]) group["title"] = newid;
    }
    if (group.type != LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type == LayerType.GroupLayer) {
                child = loopGroupId(id, newid, child);
            } else {
                if (child.id == id) {
                    if (child && child.id !== undefined) child.id = newid;
                    if (child && child.title !== undefined) child.title = newid;
                }
            }
        });
    }
    return group;
}

function loopGroupVisible(ids, group) {
    let idArray = ids.checked || ids;
    if (group.type != LayerType.GroupLayer && !group.children) {
        return group;
    }
    //if (group.type === LayerType.GroupLayer) {
    if (checkLayerVisible(idArray, group.id)) {
        group.layout = { visible: true };
    } else {
        group.layout = { visible: false };
    }
    //}

    if (group.children) {
        group.children = group.children.map((child) => {
            let result = { ...child };
            if (child.type == LayerType.GroupLayer || child.children) {
                result = loopGroupVisible(idArray, result);
            } else {
                if (!result.layout) result.layout = new ILayout();
                result.layout.visible = false;
                idArray.forEach((id) => {
                    if (id == result.id) {
                        result.layout.visible = true;
                        // 针对wms doclayer的子图层的优化
                        if (group.type !== LayerType.GroupLayer) {
                            group.layout = { visible: true };
                        }
                    }
                });
            }
            return result;
        });
        //group.children = result;
    }
    return group;
}

export function compareLayers(layersa: Array<ILayer>, layersb: Array<ILayer>) {
    if (!layersa || !layersb) return false;
    if (layersa.length != layersb.length) return false;
    for (let i = 0; i < layersa.length; i++) {
        let a = layersa[i];
        let b = layersb[i];
        if (deepEqual(a, b) == false) return false;
    }
    return true;
}
