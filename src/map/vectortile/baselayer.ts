import { ILayer, ILayout, IStyle, IFilter, VectorTileType, LayerType } from "../layer";
import IDocument from "../document";
import { loopGroupProp } from '../layer/grouplayer';

export class BaseLayer extends ILayer {
    source: string;
    sourceLayer: string;
    data?: any;
    minZoom?: number;
    maxZoom?: number;

    fixIcon?() {
        switch (this.subtype) {
            case VectorTileType.BackGround:
                this.icon = "icon-tiaoseban"
                break;
            case VectorTileType.Circle:
                this.icon = "icon-vectorcirclevariant";
                break;
            case VectorTileType.Line:
                this.icon = "icon-vectorpolyline";
                break;
            case VectorTileType.Fill:
                this.icon = "icon-vector-polygon";
                break;
            case VectorTileType.FillExtrusion:
                this.icon = "icon-vector-polygon";
                break;
            case VectorTileType.Symbol:
                this.icon = "icon-dollar-symbol-1";
                break;
            case VectorTileType.Heatmap:
                this.icon = "icon-echarts_heatmap";
                break;
            case VectorTileType.HillShade:
                this.icon = "icon-mountain-";
            default:
                break;
        }
    }
}

export interface BaselayerAction {
    parsePaint(style: IStyle);
    parseLayout(layout: ILayout);
}


export function changeVectorTileStyle(
    vector: ILayer,
    style: any,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers.map(layer => {
        if (layer.type == LayerType.GroupLayer) {
            if (layer.children) {
                loopGroupProp(vector.id, "style", style, layer);
            }
        } else {
            if (layer.id == vector.id) {
                if (layer.type == LayerType.RasterTile) {
                    layer.style = style;
                }
            }
        }
    });

    return layers;
}

export function changeVectorTileLayout(
    vector: ILayer,
    layout: ILayout,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers.map(layer => {
        if (layer.type == LayerType.GroupLayer) {
            if (layer.children) {
                loopGroupProp(vector.id, "layout", layout, layer);
            }
        } else {
            if (layer.id == vector.id) {
                if (layer.type == LayerType.RasterTile) {
                    layer.layout = layout;
                }
            }
        }
    });

    return layers;
}

export function changeVectorTileFilter(
    vector: ILayer,
    filter: IFilter,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers.map(layer => {
        if (layer.type == LayerType.GroupLayer) {
            if (layer.children) {
                loopGroupProp(vector.id, "filter", filter, layer);
            }
        } else {
            if (layer.id == vector.id) {
                if (layer.type == LayerType.VectorTile) {
                    layer.filter = filter;
                }
            }
        }
    });

    return layers;
}

export function changeVectorTileType(
    vector: ILayer,
    subtype: VectorTileType,
    document: IDocument
) {
    let layers = document.layers;
    if (!layers) return undefined;

    layers.map(layer => {
        if (layer.type == LayerType.GroupLayer) {
            if (layer.children) {
                loopGroupProp(vector.id, "subtype", subtype, layer);
            }
        } else {
            if (layer.id == vector.id) {
                if (layer.type == LayerType.VectorTile) {
                    layer.subtype = subtype;
                }
            }
        }
    });

    return layers;
}

export function changeVectorTileZoom(
    vector: ILayer,
    minZoom: number,
    maxZoom: number,
    document: IDocument
) {
    let layers = document.layers;
    if (minZoom < 0 || maxZoom < 0) return layers;
    if (!layers) return undefined;

    layers.map(layer => {
        if (layer.type == LayerType.GroupLayer) {
            if (layer.children) {
                loopGroupProp(vector.id, "minZoom", minZoom, layer);
                loopGroupProp(vector.id, "maxZoom", maxZoom, layer);
            }
        } else {
            if (layer.id == vector.id) {
                if (layer.type == LayerType.VectorTile) {
                    let vector = new BaseLayer();
                    vector = { ...layer, source: undefined, sourceLayer: undefined };
                    vector.minZoom = minZoom;
                    vector.maxZoom = maxZoom;
                    return vector;
                }
            }
            return layer;
        }
    });

    return layers;
}

export function changeVectorTileBase(
    vector: ILayer,
    base: any,
    document: IDocument
) {
    let layers = document.layers;
    if (!base) return layers;
    if (!layers) return undefined;

    layers.map(layer => {
        if (layer.type == LayerType.GroupLayer) {
            if (layer.children) {
                base.id && loopGroupProp(vector.id, "id", base.id, layer);
                base.source && loopGroupProp(vector.id, "source", base.source, layer);
                base.sourceLayer && loopGroupProp(vector.id, "sourceLayer", base.sourceLayer, layer);
                base.info && loopGroupProp(vector.id, "info", base.info, layer);
            }
        } else {
            if (layer.id == vector.id) {
                if (layer.type == LayerType.VectorTile) {
                    let vector = new BaseLayer();
                    vector = { ...layer, source: undefined, sourceLayer: undefined };
                    base.id && (vector.id = base.id);
                    base.source && (vector.source = base.source);
                    base.sourceLayer && (vector.sourceLayer = base.sourceLayer);
                    base.info && (vector.info = base.info);
                    return vector;
                }
            }
            return layer;
        }
    });

    return layers;
}