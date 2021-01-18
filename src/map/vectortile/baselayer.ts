import { ILayer, ILayout, IStyle, IFilter, LayerType } from "../layer";
import { IDocument } from "../document";
import { loopGroupProp } from "../layer/grouplayer";

export enum VectorTileType {
  BackGround = "BackGround",
  Raster = "Raster",
  Circle = "Circle",
  Line = "Line",
  Fill = "Fill",
  FillExtrusion = "FillExtrusion",
  Symbol = "Symbol",
  Heatmap = "Heatmap",
  HillShade = "HillShade",
}

export enum VectorTileGeomType {
  Circle = "Circle",
  Line = "Line",
  Fill = "Fill",
  FillExtrusion = "FillExtrusion",
  Symbol = "Symbol",
}

export let VectorTileLayerDefine = {
  BackGround: {
    type: "background",
    subtype: "Background",
    name: "背景",
    icon: "icon-background",
    info: "背景图层，用来设置背景颜色",
    limit: [VectorTileType.BackGround],
  },
  Raster: {
    type: "raster",
    subtype: LayerType.RasterTile,
    name: "栅格瓦片",
    icon: "icon-background",
    info: "栅格图层，用来作为底图",
    limit: [VectorTileType.Raster],
  },
  Circle: {
    type: "circle",
    subtype: LayerType.VectorTile,
    name: "点",
    icon: "icon-erweidian",
    info: "只能实现单纯的点的样式",
    limit: [
      VectorTileType.Circle,
      VectorTileType.Heatmap,
      VectorTileType.Symbol,
    ],
  },
  Line: {
    type: "line",
    subtype: LayerType.VectorTile,
    name: "线",
    icon: "icon-erweixian",
    info: "尽量使用多图层实现道路贯通",
    limit: [VectorTileType.Line, VectorTileType.Symbol],
  },
  Fill: {
    type: "fill",
    subtype: LayerType.VectorTile,
    name: "区",
    icon: "icon-vector-polygon",
    info: "区要素，多使用抗锯齿",
    limit: [
      VectorTileType.Fill,
      VectorTileType.FillExtrusion,
      VectorTileType.Symbol,
    ],
  },
  FillExtrusion: {
    type: "fill-extrusion",
    subtype: LayerType.VectorTile,
    name: "面",
    icon: "icon-erweiqu",
    info: "区加上高程信息构建对应的面要素",
    limit: [
      VectorTileType.Fill,
      VectorTileType.FillExtrusion,
      VectorTileType.Symbol,
    ],
  },
  Symbol: {
    type: "symbol",
    subtype: LayerType.VectorTile,
    name: "符号",
    icon: "icon-dollar-symbol-1",
    info: "分为文字和图片两部分",
    limit: [
      VectorTileType.Circle,
      VectorTileType.Line,
      VectorTileType.Fill,
      VectorTileType.FillExtrusion,
      VectorTileType.Symbol,
    ],
  },
  Heatmap: {
    type: "heatmap",
    subtype: LayerType.VectorTile,
    name: "热力图",
    icon: "icon-echarts_heatmap",
    info: "热力图，实现热力展示",
    limit: [VectorTileType.Circle, VectorTileType.Symbol],
  },
  HillShade: {
    type: "hillshade",
    subtype: LayerType.VectorTile,
    name: "地形阴影",
    icon: "icon-mountain-",
    info: "通过RGB组合计算阴影",
    limit: [VectorTileType.HillShade],
  },
};

export class BaseLayer extends ILayer {
  source: string;
  sourceLayer: string;
  data?: any;
  minZoom?: number;
  maxZoom?: number;

  constructor(l?: BaseLayer) {
    super(l);
    this.type = LayerType.VectorTile;
    this.minZoom = 0;
    this.maxZoom = 24;
  }

  setSubtype?(type: VectorTileType) {
    let json;
    if (type === VectorTileType.Circle) {
      json = {
        style: {
          "circle-color": "#ffffff",
          "circle-stroke-color": "#4a4a4a",
          "circle-radius": 3,
          "circle-stroke-width": 1,
          "circle-opacity": 1.0,
        },
        layout: {
          visible: true,
        },
      };
    } else if (type === VectorTileType.Line) {
      json = {
        style: {
          "line-color": "#4a4a4a",
          "line-width": 1,
          "line-opacity": 1.0,
        },
        layout: {
          visible: true,
        },
      };
    } else if (type === VectorTileType.Fill) {
      json = {
        style: {
          "fill-color": "#ffffff",
          "fill-outline-color": "#4a4a4a",
          "fill-opacity": 1.0,
        },
        layout: {
          visible: true,
        },
      };
    } else if (type === VectorTileType.FillExtrusion) {
      json = {
        style: {
          "fill-extrusion-height": 100,
          "fill-extrusion-color": "#ECEEED",
          "fill-extrusion-opacity": 1.0,
        },
        layout: {
          visible: true,
        },
      };
    } else if (type === VectorTileType.Symbol) {
      json = {
        style: {
          "text-color": "#A4A4A4",
          "text-halo-color": "#000000",
          "text-halo-width": 1,
        },
        layout: {
          "text-field": "{name}",
          "text-font": ["微软雅黑", "微软雅黑"],
          visible: true,
        },
      };
    }
    this.style = json.style;
    this.layout = json.layout;
  }

  fixIcon?() {
    switch (this.subtype) {
      case VectorTileType.BackGround:
        this.icon = "icon-tiaoseban";
        break;
      case VectorTileType.Circle:
        this.icon = "icon-erweidian";
        break;
      case VectorTileType.Line:
        this.icon = "icon-erweixian";
        break;
      case VectorTileType.Fill:
        this.icon = "icon-erweiqu";
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

  layers.map((layer) => {
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

  layers.map((layer) => {
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

  layers.map((layer) => {
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

  layers.map((layer) => {
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

  layers.map((layer) => {
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

  layers.map((layer) => {
    if (layer.type == LayerType.GroupLayer) {
      if (layer.children) {
        base.id && loopGroupProp(vector.id, "id", base.id, layer);
        base.source && loopGroupProp(vector.id, "source", base.source, layer);
        base.sourceLayer &&
          loopGroupProp(vector.id, "sourceLayer", base.sourceLayer, layer);
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
