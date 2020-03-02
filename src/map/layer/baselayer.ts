import IDocument, { MapRender } from "../document";
import { Bounds } from '../map';
import { deepEqual } from '../../utils/deepequal'

export const defaultId: string = "unknow";

export enum LayerType {
    GroupLayer = "GroupLayer",
    BackGround = "BackGround",
    BackColor = "BackColor",
    RasterTile = "RasterTile",
    VectorTile = "VectorTile",
    DemWMS = "DemWMS",
    GeoJSON = "GeoJSON",
    ShapeFile = "ShapeFile",
    UnKnow = "UnKnow"
}

export let LayerDefine = {
    GroupLayer: { type: "", name: "组图层" },
    BackColor: { type: "", name: "背景颜色" },
    BackGround: { type: "", name: "背景底图" },
    RasterTile: { type: "", name: "栅格瓦片" },
    VectorTile: { type: "", name: "矢量瓦片" },
    DemWMS: { type: "", name: "DEM" },
    GeoJSON: { type: "", name: "GeoJSON" },
    ShapeFile: { type: "", name: "ShapeFile" },
    UnKnow: { type: "", name: "未知" }
}

export enum VectorTileType {
    BackGround = "BackGround",
    Circle = "Circle",
    Line = "Line",
    Fill = "Fill",
    FillExtrusion = "FillExtrusion",
    Symbol = "Symbol",
    Heatmap = "Heatmap",
    HillShade = "HillShade"
}

export let VectorTileLayerDefine = {
    BackGround: {
        type: "background", name: "背景", icon: "icon-background",
        info: "背景图层，用来设置背景颜色",
        limit: [VectorTileType.BackGround]
    },
    Circle: {
        type: "circle", name: "点", icon: "icon-pointer",
        info: "只能实现单纯的点的样式",
        limit: [VectorTileType.Circle, VectorTileType.Heatmap, VectorTileType.Symbol]
    },
    Line: {
        type: "line", name: "线", icon: "icon-vectorpolyline",
        info: "尽量使用多图层实现道路贯通",
        limit: [VectorTileType.Line, VectorTileType.Symbol]
    },
    Fill: {
        type: "fill", name: "区", icon: "icon-vector-polygon",
        info: "区要素，多使用抗锯齿",
        limit: [VectorTileType.Fill, VectorTileType.FillExtrusion, VectorTileType.Symbol]
    },
    FillExtrusion: {
        type: "fill-extrusion", name: "面", icon: "icon-cube",
        info: "区加上高程信息构建对应的面要素",
        limit: [VectorTileType.Fill, VectorTileType.FillExtrusion, VectorTileType.Symbol]
    },
    Symbol: {
        type: "symbol", name: "符号", icon: "icon-dollar-symbol-1",
        info: "分为文字和图片两部分",
        limit: [VectorTileType.Circle, VectorTileType.Line, VectorTileType.Fill, VectorTileType.FillExtrusion, VectorTileType.Symbol]
    },
    Heatmap: {
        type: "heatmap", name: "热力图", icon: "icon-echarts_heatmap",
        info: "热力图，实现热力展示",
        limit: [VectorTileType.Circle, VectorTileType.Symbol]
    },
    HillShade: {
        type: "hillshade", name: "地形阴影", icon: "icon-mountain-",
        info: "通过RGB组合计算阴影",
        limit: [VectorTileType.HillShade]
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
    info?: IInfo;

    filter?: IFilter;
    layout?: ILayout;
    style?: IStyle;
    /**
     * @member 表示font图标，和iconfont强绑定
     */
    icon?: string;
    children?: Array<ILayer>;
    subtype?: any;
    bounds?: Bounds;
}

export interface ICommonAction {
    dispatchNameChange(layer: ILayer, name: string, doc: IDocument);
    handleNameChange(name: string);
}

export class IInfo { }

export class IStyle { }

export class IFilter { }

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
        [property]: value
    }
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
            ids = layers.filter(layer => layer.id === id)
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

    layers.map(item => {
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

export function changeLayerId(
    layer: ILayer,
    id: string,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers.map(item => {
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

export function checkLayerVisible(
    visibleIds: Array<string>,
    id: string
) {
    for (var i = 0; i < visibleIds.length; i++) {
        let visibleId = visibleIds[i]
        if (id == visibleId) return true
    }
    return false
}

export function changeLayersVisible(
    visibleIds: Array<string>,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers = layers.map(layer => {
        if (layer.type == LayerType.GroupLayer) {
            if (layer.children) {
                if (checkLayerVisible(visibleIds, layer.id)) {
                    layer.layout = { visible: true }
                }
                loopGroupVisible(visibleIds, layer);
            }
        } else {
            if (!layer.layout) layer.layout = new ILayout();
            layer.layout.visible = false;
            visibleIds.forEach(id => {
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
        group.children.map(child => {
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
        group.children.map(child => {
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
    let idArray = ids.checked || ids
    if (group.type != LayerType.GroupLayer) {
        return group;
    }
    if (checkLayerVisible(idArray, group.id)) {
        group.layout = { visible: true }
    } else {
        group.layout = { visible: false }
    }
    if (group.children) {
        group.children = group.children.map(child => {
            let result = { ...child };
            if (child.type == LayerType.GroupLayer) {
                result = loopGroupVisible(idArray, result);
            } else {
                if (!result.layout) result.layout = new ILayout();
                result.layout.visible = false;
                idArray.forEach(id => {
                    if (id == result.id) {
                        result.layout.visible = true;
                    }
                });
            }
            return result;
        });
        //group.children = result;
    }
    return group;
}


export function compareLayers(layersa:Array<ILayer>, layersb:Array<ILayer>) {
    if(!layersa || !layersb) return false
    if(layersa.length != layersb.length) return false
    for(let i = 0; i < layersa.length; i++){
        let a = layersa[i]
        let b = layersb[i]
        if(deepEqual(a, b) == false) return false
    }
    return true
}
