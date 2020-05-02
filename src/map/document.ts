import backgrouds, {
  defaultBackground,
  getBackground
} from "./config/backgroud";

import {
  defaultRasterLayer,
  defaultVectorLayer,
  defaultGroupLayer
} from "./config/layers";

import {
  LayerType,
  ILayer,
  defaultId,
  BackGroundLayer,
  RasterTileLayer,
  VectorTileLayer,
  changeLayersVisible
} from "./layer";

import {
  findLayer,
  findLayersByType,
  findLayersById,
  addGroupItem,
  addItemNearItem,
  deleteGroupItem,
  flatLayers,
  copyGroupItem,
  specialGroupItem,
  loopLayerProp,
  loopLayerVisible,
  forceLayerVisible,
  loopLayerPosition
} from "./layer/grouplayer";

import { moveArray } from "../utils/array";
import { uuid } from "../utils/uuid";
import { deepCopy } from "../utils/deepequal";
import { Bounds, defaultBounds } from "./map";
import { defaultService } from "./service/defaultservice";
import { defaultSources, Source } from "./source/source";
import { Crs, defaultCrs } from "./crs/crs";

export enum MapRender {
  MapBoxGL = "mapboxgl",
  Cesium = "cesium"
}

export class Current {
  id: string;
  type: LayerType;
  name?: string;
}

export const defaultCurrent = {
  id: defaultId,
  type: LayerType.UnKnow,
  name: defaultId
};

export const defaultLayers: Array<ILayer> = [];
//.concat(defaultGroupLayer)
//.concat(defaultVectorTileLayer)
//.concat(defaultRasterLayer)
//.concat(defaultDemWmsLayer)

export const defaultSource = defaultSources;

export const defaultName = "默认地图文档";

export const defaultSprites =
    "http://localhost:6163/igs/rest/mrms/vtiles/sprite";
export const defaultGlyphs =
    "http://localhost:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf";

/**
 * @author 潘卓然
 * @description 通用地图文档接口
 */
export class IDocument {
  name: string;
  current: Current; //实例属性
  maprender: MapRender;
  backgrounds: Array<BackGroundLayer>; //实例属性
  layers: Array<ILayer>;

  sources: Object; // Array<Source>;
  service?: Object; // Array<Service>;
  sprite?: string;
  glyphs?: string;
  bounds?: Bounds;
  before?: string; //表示堆顶图层

  crs?: Crs;

  //构造函数
  constructor(
    name: string,
    current: Current,
    backgrounds: Array<BackGroundLayer>,
    layers: Array<ILayer>,
    sources?: Object,
    maprender?: MapRender,
    bounds?: Bounds,
    sprite?: string,
    glyphs?: string,
    service?: Object,
    crs?: Crs
  ) {
    this.name = name ? name : defaultName;
    this.current = current ? current : defaultCurrent;
    this.backgrounds = backgrounds ? backgrounds : defaultBacks;
    this.layers = layers ? layers : defaultLayers;
    this.sources = sources ? sources : defaultSources;
    this.service = service ? service : defaultService;
    this.maprender = maprender ? maprender : MapRender.MapBoxGL;
    this.bounds = bounds ? bounds : defaultBounds;
    this.sprite = sprite ? sprite : defaultSprites;
    this.glyphs = glyphs ? glyphs : defaultGlyphs;
    this.crs = crs ? crs : defaultCrs;
  }

  //实例方法
  getBackgrouds() {
    return this.backgrounds;
  }

  getSources() {
    return this.sources;
  }

  getCurrent(document?: IDocument) {
    if (!document) return this.current;
    if (!document) return defaultCurrent;
    if (!document.current) return defaultCurrent;
    return document.current;
  }

  getCurrentLayers() {
    if (this.current.type == LayerType.UnKnow) {
      return [defaultLayer];
    }
    if (this.current.type == LayerType.BackGround) {
      return this.backgrounds;
    }
    if (
      this.current.type == LayerType.VectorTile ||
      this.current.type == LayerType.RasterTile
    ) {
      return this.getLayersById(this.current.id);
    } else {
      return this.getLayersById(this.current.id);
    }
    return [defaultLayer];
  }

  getCurrentLayer() {
    if (this.current.type == LayerType.UnKnow) {
      return defaultLayer;
    }
    if (this.current.type == LayerType.BackGround) {
      if (this.backgrounds && this.backgrounds.length >= 1)
        return this.backgrounds[0];
    }
    if (
      this.current.type == LayerType.VectorTile ||
      this.current.type == LayerType.RasterTile
    ) {
      const results = this.getLayersById(this.current.id);
      if (results && results.length >= 1) return results[0];
    } else {
      const results = this.getLayersById(this.current.id);
      if (results && results.length >= 1) return results[0];
    }

    return defaultLayer;
  }

  getCurrentInfo() {
    let layers = this.getCurrentLayers();
    let info = undefined;
    if (layers && layers.length >= 1) {
      let layer = layers[0];
      switch (layer.type) {
        case LayerType.BackGround:
          info = layer.info;
          if (layer instanceof BackGroundLayer) {
          }
          break;
        case LayerType.RasterTile:
          info = layer.info;
          if (layer instanceof RasterTileLayer) {
            //<RasterTileLayer>layer).info do not work
          }
          break;
        case LayerType.VectorTile:
          info = layer.info;
          break;
        case LayerType.DemWMS:
          info = layer.info;
          break;
        default:
          info = layer.info;
          break;
      }
    }
    return info;
  }

  getCurrentStyle() {
    let layers = this.getCurrentLayers();
    let style = undefined;
    if (layers && layers.length >= 1) {
      let layer = layers[0];
      switch (layer.type) {
        case LayerType.BackGround:
          style = layer.style;
          if (layer instanceof BackGroundLayer) {
          }
          break;
        case LayerType.RasterTile:
          style = layer.style;
          if (layer instanceof RasterTileLayer) {
            //<RasterTileLayer>layer).style do not work
          }
          break;
        case LayerType.VectorTile:
          break;
      }
    }
    return style;
  }

  getCurrentLayout() {
    let layers = this.getCurrentLayers();
    let layout = undefined;
    if (layers && layers.length >= 1) {
      let layer = layers[0];
      switch (layer.type) {
        case LayerType.BackGround:
          layout = layer.layout;
          if (layer instanceof BackGroundLayer) {
          }
          break;
        case LayerType.RasterTile:
          layout = layer.layout;
          if (layer instanceof RasterTileLayer) {
            //<RasterTileLayer>layer).layout do not work
          }
          break;
        case LayerType.VectorTile:
          layout = layer.layout;
          break;
        case LayerType.DemWMS:
          layout = layer.layout;
          break;
        default:
          layout = layer.layout;
          break;
      }
    }
    return layout;
  }

  changeCurrent(id: string) {
    let current = defaultCurrent;

    for (var i = 0; i < this.backgrounds.length; i++) {
      let back = this.backgrounds[i];
      if (back.id == id) {
        current.id = back.id;
        current.type = LayerType.BackGround;
        current.name = back.name;
        return current;
      }
    }

    for (var i = 0; i < this.layers.length; i++) {
      let layer = this.layers[i];
      if (layer.type == LayerType.GroupLayer) {
        let find = findLayer(id, layer);
        if (find) {
          current.id = find.id;
          current.type = find.type;
          current.name = find.name;
        }
      } else {
        if (layer.id == id) {
          current.id = layer.id;
          current.type = layer.type;
          current.name = layer.name;
          return current;
        }
      }
    }

    return current;
  }

  getLayers() {
    return this.layers;
  }

  getFlatLayers(filtergroup: boolean = true) {
    let flats = [];
    this.layers.forEach(layer => {
      if (layer.type == LayerType.GroupLayer || layer.children) {
        let flat = flatLayers(layer, filtergroup);
        flats = flats.concat(flat);
      } else {
        flats.push(layer);
      }
    });
    return flats;
  }

  getCheckedLayers(document?: IDocument) {
    let checkedKeys = [];
    let flats, idoc;
    if (document) {
      idoc = IDocument.clone(document);
      flats = idoc.getFlatLayers();
    } else {
      flats = this.getFlatLayers();
      console.log("flats", flats);
    }

    flats.forEach(layer => {
      if (
        (!layer.layout && layer.type != LayerType.GroupLayer) ||
        (layer.layout && layer.layout.visible == true)
      ) {
        checkedKeys.push(layer.id);
      } else if (
        layer.type == LayerType.GroupLayer &&
        layer.layout &&
        layer.layout.visible
      ) {
        checkedKeys.push(layer.id);
      }
    });

    return checkedKeys;
  }

  /**
   * @param type LayerType
   * @returns Array<ILayer> | Array<DemWMSLayer> | Array<RasterTileLayer> | Array<VectorTileLayer>
   */
  getLayersByType(type: LayerType): ILayer[] {
    return this.layers.reduce(function(total, layer, index, arr) {
      let result = [];
      if (layer.type == LayerType.GroupLayer) {
        result = findLayersByType(type, layer);
      } else {
        if (layer.type == type) {
          result.push(layer);
        }
      }
      return total.concat(result);
    }, []);
  }

  getLayersById(id: string) {
    return this.layers.reduce(function(total, layer, index, arr) {
      let result = [];
      if (layer.type == LayerType.GroupLayer) {
        result = findLayersById(id, layer);
      } else {
        if (layer.id == id) {
          result.push(layer);
        }
      }
      return total.concat(result);
    }, []);
  }

  getLayerById(id: string) {
    let layers = this.layers.reduce(function(total, layer, index, arr) {
      let result = [];
      if (layer.type == LayerType.GroupLayer) {
        result = findLayersById(id, layer);
      } else {
        if (layer.id == id) {
          result.push(layer);
        }
      }
      return total.concat(result);
    }, []);
    if (layers.length > 0) {
      return layers[0];
    }
    return null;
  }

  addLayerInGroup(layer: ILayer, parent: string) {
    if (!parent) {
      this.layers.push(layer);
    } else {
      this.layers = this.layers.map(group => {
        if (group.type == LayerType.GroupLayer ||
            (group.children && group.children.length >= 0)
        ) {
          group = addGroupItem(layer, parent, group);
        }
        return group;
      });
    }
    return this.layers;
  }

  addLayerNearLayer(layer: ILayer, where: string, before: boolean) {
    if (!where) {
      this.layers.push(layer);
    } else {
      let children = this.layers.map(child => {
        return child;
      });
      let parent = { children: this.layers };
      children.map(group => {
        group = addItemNearItem(layer, where, group, parent, before);
      });
      //this.layers = parent.children;
    }
    return this.layers;
  }

  copyLayer(id: string) {
    let position = -1;
    let copy;
    this.layers = this.layers.map((layer, index) => {
      if (layer.type == LayerType.GroupLayer) {
        //if (layer.id == id) return false;
        layer = copyGroupItem(id, layer);
      } else {
        if (layer.id == id) {
          //组图层复制 后面再说，先不管
          position = index + 1;
          let key = uuid();
          let name = layer.title + "复制";
          copy = deepCopy(layer);
          copy = { ...copy, key: key, id: key, name: name, title: name };
        } else {
        }
      }
      return layer;
    });
    if (position > 0) this.layers.splice(position, 0, copy);
    return this.layers;
  }

  specialLayer(id: string, type: string) {
    let position = -1;
    let copy, typeName, iconfont;
    switch (type) {
      case "monodrome":
        typeName = "单值";
        iconfont = "icon-tongyongdanzhipipei";
        break;
      case "subsection":
        typeName = "分段";
        iconfont = "icon-fenji";
        break;
      case "statistics":
        typeName = "统计";
        iconfont = "icon-tongji";
        break;
      case "density":
        typeName = "密度";
        iconfont = "icon-midufenxiSVG";
        break;
      case "grade":
        typeName = "等级";
        iconfont = "icon-dengji";
        break;
    }
    this.layers = this.layers.map((layer, index) => {
      if (layer.type == LayerType.GroupLayer) {
        //if (layer.id == id) return false;
        layer = specialGroupItem(id, layer, type);
      } else {
        if (layer.id == id) {
          //组图层复制 后面再说，先不管
          position = index + 1;
          let key = uuid();
          let name = layer.title + "-" + typeName + "专题图";
          let special = type;
          copy = deepCopy(layer);
          copy = {
            ...copy,
            key: key,
            id: key,
            name: name,
            title: name,
            special: special,
            icon: iconfont
          };
        } else {
        }
      }
      return layer;
    });
    if (position > 0) this.layers.splice(position, 0, copy);
    return this.layers;
  }

  deleteLayer(id: string) {
    this.layers = this.layers.filter(layer => {
      if (layer.type == LayerType.GroupLayer) {
        if (layer.id == id) return false;
        layer = deleteGroupItem(id, layer);
        return true;
      } else {
        if (layer.id == id) {
          return false;
        } else {
          return true;
        }
      }
    });
    return this.layers;
  }

  /**
   * @description 如果组图层的子节点数据为空删除子节点属性
   */
  fixGroupLayer() {}

  getSource(name: string): Source {
    let find = this.sources[name];
    if (find) return find;
    return undefined;
  }

  addSource(source: Source): Object {
    let find = this.sources[source.name];
    if (find) {
      return this.sources;
    } else {
      this.sources[source.name] = source;
    }
    return this.sources;
  }

  deleteSource(name: string): Object {
    let find = this.sources[name];
    if (find) {
      return (this.sources[name] = undefined);
    }
    return this.sources;
  }

  updateSource(source: Source): Object {
    let update = [];
    for (var name in this.sources) {
      if (name == source.name) {
        this.sources[name] = source;
      }
    }

    return this.sources;
  }

  changeLayerVisible(id, visible: boolean) {
    let layers = this.layers;
    if (!layers) return undefined;

    layers.map(item => {
      if (item.type == LayerType.GroupLayer) {
        if (item.id === id) {
          forceLayerVisible(visible, item);
        } else {
          if (item.children) {
            loopLayerVisible(id, visible, item);
          }
        }
      } else {
        if (item.id === id) {
          if (!item.layout) {
            item.layout = { visible: visible };
          } else {
            item.layout = {
              ...item.layout,
              visible: visible
            };
          }
        }
      }
    });

    return layers;
  }

  checkVisibleLayers(visibleIds) {
    this.layers = changeLayersVisible(visibleIds, this)
    return this.layers;
  }

  changeLayerPosition(id, position: number) {
    let layers = this.layers;
    if (!layers) return undefined;

    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i];
      if (layer.id === id) {
        layers = moveArray(layers, i, i + position);
        break;
      } else if (layer.type === LayerType.GroupLayer) {
        layer = loopLayerPosition(id, position, layer);
      }
    }

    return layers;
  }

  changeLayerProp(id, propName, propValue) {
    let layers = this.layers;
    if (!layers) return undefined;

    layers.map(item => {
      if (item.type == LayerType.GroupLayer) {
        if (item.children) {
          loopLayerProp(id, propName, propValue, item);
        }
      } else {
        if (item.id == id) {
          item[propName] = propValue;
        }
      }
    });

    return layers;
  }

  static clone(document: IDocument): IDocument {
    if (!document) return undefined;
    let {
      name,
      current,
      backgrounds,
      layers,
      sources,
      maprender,
      bounds,
      sprite,
      glyphs,
      service
    } = document;
    let copy = new IDocument(
      name,
      current,
      backgrounds,
      layers,
      sources,
      maprender,
      bounds,
      sprite,
      glyphs,
      service
    );
    return copy;
  }

  static deepclone(document: IDocument): IDocument {
    if (!document) return undefined;
    let {
      name,
      current,
      backgrounds,
      layers,
      sources,
      maprender,
      bounds,
      sprite,
      glyphs,
      service,
      crs
    } = document;
    let newLayers = [];

    layers.forEach(layer => {
      let newLayer = deepCopy(layer);
      newLayers.push(newLayer);
    });

    let copy = new IDocument(
      name,
      current,
      backgrounds,
      newLayers,
      sources,
      maprender,
      bounds,
      sprite,
      glyphs,
      service,
      crs
    );
    return copy;
  }

  static Default(): IDocument {
    return defaultDocument;
  }
}

export const defaultMapRender: MapRender = MapRender.MapBoxGL;

export const defaultLayer: ILayer = {
  type: LayerType.UnKnow,
  name: LayerType.UnKnow,
  id: LayerType.UnKnow,
  key: LayerType.UnKnow
};

export const defaultBacks: Array<BackGroundLayer> = [
  {
    title: "浅色背景",
    name: "MapBox浅色背景",
    id: "mapboxlight",
    key: "mapboxlight",
    description: "MapboxGL提供的浅色背景图，版本是v4, WMTS服务",
    icon: "icon-background",
    type: LayerType.BackGround,
    url: "",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859980-16e31c80-69c4-11e9-9e15-0980bd7ff947.png"
  }
];

export const defaultDocument: IDocument = new IDocument(
  defaultName,
  defaultCurrent,
  defaultBacks,
  defaultLayers,
  defaultSources,
  MapRender.MapBoxGL
);

export function cloneDocument(document: IDocument): IDocument {
  let {
    name,
    current,
    backgrounds,
    layers,
    sources,
    maprender,
    bounds,
    sprite,
    glyphs,
    service
  } = document;
  let copy = new IDocument(
    name,
    current,
    backgrounds,
    layers,
    sources,
    maprender,
    bounds,
    sprite,
    glyphs,
    service
  );
  return copy;
}

export function deepcloneDocument(document: IDocument): IDocument {
  let {
    name,
    current,
    backgrounds,
    layers,
    sources,
    maprender,
    bounds,
    sprite,
    glyphs,
    service,
    crs
  } = document;
  let newLayers = [];

  layers.forEach(layer => {
    let newLayer = deepCopy(layer);
    newLayers.push(newLayer);
  });

  let copy = new IDocument(
    name,
    current,
    backgrounds,
    newLayers,
    sources,
    maprender,
    bounds,
    sprite,
    glyphs,
    service,
    crs
  );
  return copy;
}

export default IDocument;
