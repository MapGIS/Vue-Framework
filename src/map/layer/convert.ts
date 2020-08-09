import { IDocument } from "../document";

import { LayerType, IgsLayerType } from "../layer";
import { IgsLayerTypeDefine } from "./igserver";
import { VectorTileLayerDefine } from "../vectortile/baselayer";

/**
 * @class Layer.Convert
 * @description 将中地数码的地图文档切换成MapboxGL的地图文档
 */
export class Convert {
  docToMvtLayers(doc: IDocument, remove: boolean = false) {
    let layers = [];
    if (!doc) return layers;

    let flats = doc.getFlatLayers();
    layers = flats.map((layer) => {
      let { sourceLayer, type, subtype, layout, style, children } = layer;

      layer["type"] = this.docTomvtType(subtype);
      layer["subtype"] = this.docTomvtSubtype(subtype);
      layer["layout"] = this.docTomvtLayout(layout);
      layer["paint"] = style || {};

      if (type === VectorTileLayerDefine.Raster.type) {
        layer["source-layer"] = "null";
      } else {
        layer["source-layer"] = sourceLayer || "null";
      }

      if (
        subtype === IgsLayerType.IgsDocLayer ||
        subtype === IgsLayerType.IgsWmsLayer
      ) {
        layer.children = children;
      }

      if (remove) {
        delete layer.style;
        delete layer.subtype;
        delete layer.icon;
        delete layer.sourceLayer;
        delete layer.title;
        delete layer.name;
        delete layer.url;
      }

      return layer;
    });

    return layers;
  }

  docTomvtType(subtype) {
    let type = subtype;
    if (IgsLayerTypeDefine[subtype] && IgsLayerTypeDefine[subtype].type) {
      type = IgsLayerTypeDefine[subtype].type;
    } else if (
      VectorTileLayerDefine[subtype] &&
      VectorTileLayerDefine[subtype].type
    ) {
      type = VectorTileLayerDefine[subtype].type;
    }
    return type;
  }

  docTomvtSubtype(subtype) {
    let type = subtype;
    if (IgsLayerTypeDefine[subtype] && IgsLayerTypeDefine[subtype].type) {
      type = IgsLayerTypeDefine[subtype].subtype;
    } else if (
      VectorTileLayerDefine[subtype] &&
      VectorTileLayerDefine[subtype].type
    ) {
      type = VectorTileLayerDefine[subtype].subtype;
    }
    return type;
  }

  docTomvtLayout(layout) {
    if (!layout) layout = { visibility: "visible" };
    if (layout.visible == undefined) {
      layout["visibility"] = "visible";
    } else if (layout.visible) {
      layout["visibility"] = "visible";
    } else {
      layout["visibility"] = "none";
    }
    delete layout.visible;
    return layout;
  }
}
