import {
  ILayer,
  LayerType,
  IStyle,
  ILayout,
  changeSelfVisible,
} from "./baselayer";

import IDocument from "../document";
import { moveArray } from "../../utils/array";
import { uuid } from "../../utils/uuid";
import { deepCopy } from "../../utils/deepequal";

export class GroupLayer extends ILayer {
  children?: Array<ILayer>;

  constructor() {
    super();
    this.title = "新建组图层";
    this.id = this.key = uuid();
  }
}

export function flatLayers(group, filtergroup: boolean = true): Array<ILayer> {
  let layers = [];

  if (filtergroup === false) layers.push(group);
  if (group.children) {
    group.children.forEach((child) => {
      if (child.type == LayerType.GroupLayer || child.children) {
        let innerLayers = flatLayers(child, filtergroup);
        layers = layers.concat(innerLayers);
        if (child.type != LayerType.GroupLayer && child.children) {
          layers.push(child);
        }
      } else {
        layers.push(child);
      }
    });
  } else {
    if (group.type != LayerType.GroupLayer) {
      return [];
    }
  }
  return layers;
}

export function findLayer(id: string, group) {
  let layer = undefined;

  if (group.type != LayerType.GroupLayer) {
    if (group.id == id) {
      layer = layer || group;
    }
    return layer;
  }
  if (group.children) {
    group.children.forEach((child) => {
      if (child.type == LayerType.GroupLayer) {
        layer = layer || findLayer(id, child);
      } else {
        if (child.id == id) {
          layer = layer || child;
        }
      }
    });
  }
  return layer;
}

export function findLayerIndex(id: string, group): number {
  let index = -1;
  if (!group.children) return index;

  group.children.forEach((layer, i) => {
    if (layer.id == id) index = i;
  });

  return index;
}

export function findLayersByType(type, group): Array<ILayer> {
  let layers = [];

  if (group.type != LayerType.GroupLayer) {
    return [];
  }

  if (group.children) {
    group.children.forEach((child) => {
      if (child.type == LayerType.GroupLayer) {
        let innerLayers = findLayersByType(type, child);
        layers = layers.concat(innerLayers);
      } else {
        if (child.type == type) {
          layers.push(child);
        }
      }
    });
  }
  return layers;
}

export function findLayersById(id, group): Array<ILayer> {
  let layers = [];

  if (group.type != LayerType.GroupLayer) {
    return [];
  }

  if (group.id == id) {
    layers.push(group);
  }

  if (group.children) {
    group.children.forEach((child) => {
      if (child.type == LayerType.GroupLayer) {
        let innerLayers = findLayersById(id, child);
        layers = layers.concat(innerLayers);
      } else {
        if (child.id == id) {
          layers.push(child);
        }
      }
    });
  }
  return layers;
}

export function loopLayerProp(id, propName, propValue, group) {
  if (group.id == id) {
    if (group && group[propName]) group[propName] = propValue;
  }
  if (group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.children) {
    group.children.map((child) => {
      if (child.type == LayerType.GroupLayer) {
        child = loopLayerProp(id, propName, propValue, child);
      } else {
        if (child.id == id) {
          if (child && child[propName] !== undefined) {
            child[propName] = propValue;
          }
        }
      }
    });
  }
  return group;
}

export function loopLayerStyle(id, propName, propValue, group) {
  if (group.id == id) {
    if (group) {
      if (!group.style) {
        group.style = {};  
      } 
      group.style[propName] = propValue;
    }
  }
  if (group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.children) {
    group.children.map((child) => {
      if (child.type == LayerType.GroupLayer) {
        child = loopLayerStyle(id, propName, propValue, child);
      } else {
        if (child.id == id) {
          if (child) {
            if (!child.style) {
              child.style = {};  
            } 
            child.style[propName] = propValue;
          }
        }
      }
    });
  }
  return group;
}

export function loopLayerVisible(id, visible, group) {
  if (group.id == id) {
    group = changeSelfVisible(group, visible);
  }
  if (group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.children) {
    group.children.map((child) => {
      if (child.type == LayerType.GroupLayer) {
        child = loopLayerVisible(id, visible, child);
      } else {
        if (child.id == id) {
          child = changeSelfVisible(child, visible);
        }
      }
    });
  }
  return group;
}

export function forceLayerVisible(visible, group) {
  group = changeSelfVisible(group, visible);
  if (group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.children) {
    group.children.map((child) => {
      if (child.type == LayerType.GroupLayer) {
        child = forceLayerVisible(visible, child);
      } else {
        child = changeSelfVisible(child, visible);
      }
    });
  }
  return group;
}

export function loopLayerPosition(id, position, group) {
  if (group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.children) {
    for (let i = 0; i < group.children.length; i++) {
      let child = group.children[i];
      if (child.id === id) {
        group.children = moveArray(group.children, i, i + position);
        break;
      } else if (child.type === LayerType.GroupLayer) {
        child = loopLayerPosition(id, position, child);
      }
    }
  }
  return group;
}

export function loopGroupProp(id: string, key: string, value, group) {
  if (!group || group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.children) {
    group.children.map((child) => {
      if (child.type == LayerType.GroupLayer) {
        child = loopGroupProp(id, key, value, child);
      } else {
        if (child.id == id) {
          if (key == "subtype") {
            child.layout = undefined;
            child.style = undefined;
            child[key] = value;
          } else {
            child[key] = value;
          }
        }
      }
    });
  }
  return group;
}

export function addGroupItem(layer: ILayer, parent: string, group) {
  if (!group || group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.id == parent) {
    group.children.push(layer);
  } else {
    if (group.children) {
      group.children = group.children.map((child) => {
        if (child.type == LayerType.GroupLayer) {
          if (child.id == parent) {
            if (!child.children) {
              child.children = [];
            }
            child.children.push(layer);
          } else {
            child = addGroupItem(layer, parent, child);
          }
        }
        return child;
      });
    }
  }

  return group;
}

export function addItemNearItem(
  layer: ILayer,
  where: string,
  group,
  parent,
  before: boolean
) {
  let index = -1;

  if (group.id == where) {
    index = findLayerIndex(where, parent);
    index = before ? index : index + 1;
    parent.children.splice(index, 0, layer);
  } else {
    if (group.children) {
      let children = group.children.map((child) => {
        return child;
      });
      children.map((child, i) => {
        if (child.type == LayerType.GroupLayer) {
          child = addItemNearItem(layer, where, child, group, before);
        } else {
          if (child.id == where) {
            index = before ? i : i + 1;
            group.children.splice(index, 0, layer);
          }
        }
      });
    }
  }

  return group;
}

export function deleteGroupItem(id: string, group) {
  if (!group || group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.id == id) {
    group = undefined;
  } else {
    if (group.children) {
      let result = group.children.filter((child) => {
        if (child.type == LayerType.GroupLayer) {
          if (child.id == id) {
            return false;
          } else {
            child = deleteGroupItem(id, child);
            return true;
          }
        } else {
          return id != child.id;
        }
      });
      group.children = result;
    }
  }

  return group;
}

export function copyGroupItem(id: string, group) {
  if (!group || group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.id == id) {
    group = undefined;
  } else {
    if (group.children) {
      let position = -1;
      let valid = false;
      let copy;
      let result = group.children.map((child, index) => {
        if (child.type == LayerType.GroupLayer) {
          /*                     if (child.id == id) {
                                            position = index + 1;
                                            copy = child;
                                            copy.id = uuid();
                                            copy.name = child.name + "复制";
                                        } else { */
          child = copyGroupItem(id, child);
          /* } */
        } else {
          if (child.id == id) {
            position = index + 1;
            let key = uuid();
            let name = child.title + "复制";
            copy = deepCopy(child);
            copy = { ...copy, key: key, id: key, name: name, title: name };
            if (copy.key != child.key) valid = true;
          }
        }
        return child;
      });
      if (valid && position > 0) result.splice(position, 0, copy);
      group.children = result;
    }
  }

  return group;
}

export function specialGroupItem(id: string, group, type: string) {
  if (!group || group.type != LayerType.GroupLayer) {
    return group;
  }
  if (group.id == id) {
    group = undefined;
  } else {
    if (group.children) {
      let position = -1;
      let valid = false;
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
      let result = group.children.map((child, index) => {
        if (child.type == LayerType.GroupLayer) {
          /*                     if (child.id == id) {
                                            position = index + 1;
                                            copy = child;
                                            copy.id = uuid();
                                            copy.name = child.name + "复制";
                                        } else { */
          child = specialGroupItem(id, child, type);
          /* } */
        } else {
          if (child.id == id) {
            position = index + 1;
            let key = uuid();
            let name = child.title + "-" + typeName + "专题图";
            let special = type;
            copy = deepCopy(child);
            copy = {
              ...copy,
              key: key,
              id: key,
              name: name,
              title: name,
              special: special,
              icon: iconfont,
            };
            if (copy.key != child.key) valid = true;
          }
        }
        return child;
      });
      if (valid && position > 0) result.splice(position, 0, copy);
      group.children = result;
    }
  }

  return group;
}

export default GroupLayer;
