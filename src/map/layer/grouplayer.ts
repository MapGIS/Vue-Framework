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
    children?: ILayer[];

    constructor(options?: any) {
        super();
        options = options || {};
        const { title, children } = options;
        this.name = this.title = title || "新建组图层";
        this.id = this.key = uuid();
        this.children = children || [];
        this.type = LayerType.GroupLayer;
        this.description = "组图层信息";
        this.info = "组图层信息";
    }
}

export function flatLayers(group, filtergroup: boolean = true): ILayer[] {
    let layers = [];

    if (filtergroup === false) { layers.push(group); }
    if (group.children) {
        group.children.forEach((child) => {
            if (child.type === LayerType.GroupLayer || child.children) {
                const innerLayers = flatLayers(child, filtergroup);
                layers = layers.concat(innerLayers);
                if (child.type !== LayerType.GroupLayer && child.children) {
                    layers.push(child);
                }
            } else {
                child.icon = layers.push(child);
            }
        });
    } else {
        if (group.type !== LayerType.GroupLayer) {
            return [];
        }
    }
    return layers;
}

export function findLayer(id: string, group) {
    let layer;

    if (group.type !== LayerType.GroupLayer) {
        if (group.id === id) {
            layer = layer || group;
        }
        return layer;
    }
    if (group.children) {
        group.children.forEach((child) => {
            if (child.type === LayerType.GroupLayer) {
                layer = layer || findLayer(id, child);
            } else {
                if (child.id === id) {
                    layer = layer || child;
                }
            }
        });
    }
    return layer;
}

/**
 * @description 查找图层id所属的组图层
 * @param id 图层Id
 * @param group 组图层节点
 * @returns 返回图层Id所属的组图层
 */
export function findLayerGroup(id: string, group) {
    let layer;

    if (group.children) {
        group.children.forEach((child) => {
            if (child.type === LayerType.GroupLayer) {
                layer = layer || findLayerGroup(id, child);
            } else {
                if (child.id === id) {
                    layer = layer || group.children;
                }
            }
        });
    }
    return layer;
}

export function findLayerIndex(id: string, group): number {
    let index = -1;
    if (!group.children) { return index; }

    group.children.forEach((layer, i) => {
        if (layer.id === id) { index = i; }
    });

    return index;
}

export function findLayersByType(type, group): ILayer[] {
    let layers = [];

    if (group.type !== LayerType.GroupLayer) {
        return [];
    }

    if (group.children) {
        group.children.forEach((child) => {
            if (child.type === LayerType.GroupLayer) {
                const innerLayers = findLayersByType(type, child);
                layers = layers.concat(innerLayers);
            } else {
                if (child.type === type) {
                    layers.push(child);
                }
            }
        });
    }
    return layers;
}

export function findLayersById(id, group): ILayer[] {
    let layers = [];

    if (group.type !== LayerType.GroupLayer) {
        return [];
    }

    if (group.id === id) {
        layers.push(group);
    }

    if (group.children) {
        group.children.forEach((child) => {
            if (child.type === LayerType.GroupLayer) {
                const innerLayers = findLayersById(id, child);
                layers = layers.concat(innerLayers);
            } else {
                if (child.id === id) {
                    layers.push(child);
                }
            }
        });
    }
    return layers;
}

/**
 * @description 提升图层id所在组图层的顺序
 * @param id 图层Id
 * @param group 组图层节点
 * @returns 返回升序后的组图层
 */
export function upLayerInGroup(id: string, group) {
    let find = false;
    let index = -1;

    if (group && group.length > 0) {
        group.map((child, i) => {
            if (child.type === LayerType.GroupLayer && child.id !== id) {
                child = upLayerInGroup(id, child.children);
            } else {
                if (child.id == id) {
                    find = true;
                    index = i;
                }
            }
        });

        if (find && index > 0) {
            let temp = group[index - 1];
            group[index - 1] = group[index];
            group[index] = temp;
        }
    }
    return group;
}

/**
 * @description 降低图层id所在组图层的顺序
 * @param id 图层Id
 * @param group 组图层节点
 * @returns 返回降序后的组图层
 */
export function downLayerInGroup(id: string, group) {
    let find = false;
    let index = -1;

    if (group && group.length > 0) {
        group.map((child, i) => {
            if (child.type === LayerType.GroupLayer && child.id !== id) {
                child = downLayerInGroup(id, child.children);
            } else {
                if (child.id == id) {
                    find = true;
                    index = i;
                }
            }
        });

        if (find && index > 0 && index < group.length - 1) {
            let temp = group[index + 1];
            group[index + 1] = group[index];
            group[index] = temp;
        }
    }
    return group;
}

export function loopGroupName(id, name, group) {
    if (group.id === id) {
        if (group && group.name) { group.name = name; }
        if (group && group.title) { group.title = name; }
    }
    if (group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                child = loopGroupName(id, name, child);
            } else {
                if (child.title == id || child.name == id || child.id == id || child.key == id) {
                    if (child && child.name !== undefined) { child.name = name; }
                    if (child && child.title !== undefined) { child.title = name; }
                }
            }
        });
    }
    return group;
}

export function loopLayerProp(id, propName, propValue, group) {
    if (group.id === id) {
        if (group && group[propName]) { group[propName] = propValue; }
    }
    if (group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                child = loopLayerProp(id, propName, propValue, child);
            } else {
                if (child.id === id) {
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
    if (group.id === id) {
        if (group) {
            if (!group.style) {
                group.style = {};
            }
            group.style[propName] = propValue;
        }
    }
    if (group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                child = loopLayerStyle(id, propName, propValue, child);
            } else {
                if (child.id === id) {
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
    if (group.id === id) {
        group = changeSelfVisible(group, visible);
    }
    if (group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                child = loopLayerVisible(id, visible, child);
            } else {
                if (child.id === id) {
                    child = changeSelfVisible(child, visible);
                }
            }
        });
    }
    return group;
}

export function forceLayerVisible(visible, group) {
    group = changeSelfVisible(group, visible);
    if (group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                child = forceLayerVisible(visible, child);
            } else {
                child = changeSelfVisible(child, visible);
            }
        });
    }
    return group;
}

export function loopLayerPosition(id, position, group) {
    if (group.type !== LayerType.GroupLayer) {
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
    if (!group || group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                child = loopGroupProp(id, key, value, child);
            } else {
                if (child.id === id) {
                    if (key === "subtype") {
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

export function loopChildrenAction(groupid, key, value, action, group, find: boolean) {
    if (!group || group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (find && group[key]) {
        switch (action) {
            case 'prefix': group[key] = value + group[key]; break;
            case 'postfix': group[key] = group[key] + value; break;
            case 'replace': group[key] = value; break;
        }
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                if (!find) {
                    find = child.id === groupid ? true : false;
                }
                child = loopChildrenAction(groupid, key, value, action, child, find);
            } else {
                if (find && child[key]) {
                    switch (action) {
                        case 'prefix': child[key] = value + child[key]; break;
                        case 'postfix': child[key] = child[key] + value; break;
                        case 'replace': child[key] = value; break;
                    }
                }
            }
            return child;
        });
    }
    return group;
}

export function loopChildrenPrefix(groupid, prefix: string, group, find: boolean) {
    if (!group || group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (find) {
        group.key = prefix + group.key;
        group.id = prefix + group.id;
    }
    if (group.children) {
        group.children.map((child) => {
            if (child.type === LayerType.GroupLayer) {
                if (!find) {
                    find = child.id === groupid ? true : false;
                }
                child = loopChildrenPrefix(groupid, prefix, child, find);
            } else {
                if (find) {
                    child.key = prefix + child.key;
                    child.id = prefix + child.id;
                }
            }
            return child;
        });
    }
    return group;
}

export function addGroupItem(layer: ILayer, parent: string, group) {
    if (!group || group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.id === parent) {
        group.children.push(layer);
    } else {
        if (group.children) {
            group.children = group.children.map((child) => {
                if (child.type === LayerType.GroupLayer) {
                    if (child.id === parent) {
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

    if (group.id === where) {
        index = findLayerIndex(where, parent);
        index = before ? index : index + 1;
        parent.children.splice(index, 0, layer);
    } else {
        if (group.children) {
            const children = group.children.map((child) => {
                return child;
            });
            children.map((child, i) => {
                if (child.type === LayerType.GroupLayer) {
                    child = addItemNearItem(layer, where, child, group, before);
                } else {
                    if (child.id === where) {
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
    if (!group || group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.id === id) {
        group = undefined;
    } else {
        if (group.children) {
            const result = group.children.filter((child) => {
                if (child.type === LayerType.GroupLayer) {
                    if (child.id === id) {
                        return false;
                    } else {
                        child = deleteGroupItem(id, child);
                        return true;
                    }
                } else {
                    return id !== child.id;
                }
            });
            group.children = result;
        }
    }

    return group;
}

export function copyGroupItem(id: string, group) {
    if (!group || group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.id === id) {
        group = undefined;
    } else {
        if (group.children) {
            let position = -1;
            let valid = false;
            let copy;
            const result = group.children.map((child, index) => {
                if (child.type === LayerType.GroupLayer) {
                    /*                     if (child.id === id) {
                                           position = index + 1;
                                           copy = child;
                                           copy.id = uuid();
                                           copy.name = child.name + "复制";
                                           } else { */
                    child = copyGroupItem(id, child);
                    /* } */
                } else {
                    if (child.id === id) {
                        position = index + 1;
                        const key = uuid();
                        const name = child.title + "复制";
                        copy = deepCopy(child);
                        copy = { ...copy, key, id: key, name, title: name };
                        if (copy.key !== child.key) {
                            valid = true;
                        }
                    }
                }
                return child;
            });
            if (valid && position > 0) {
                result.splice(position, 0, copy);
            }
            group.children = result;
        }
    }

    return group;
}

export function specialGroupItem(id: string, group, type: string) {
    if (!group || group.type !== LayerType.GroupLayer) {
        return group;
    }
    if (group.id === id) {
        group = undefined;
    } else {
        if (group.children) {
            let position = -1;
            let valid = false;
            let copy;
            let typeName;
            let iconfont;
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
            const result = group.children.map((child, index) => {
                if (child.type === LayerType.GroupLayer) {
                    /*                     if (child.id === id) {
                                           position = index + 1;
                                           copy = child;
                                           copy.id = uuid();
                                           copy.name = child.name + "复制";
                                           } else { */
                    child = specialGroupItem(id, child, type);
                    /* } */
                } else {
                    if (child.id === id) {
                        position = index + 1;
                        const key = uuid();
                        const name = child.title + "-" + typeName + "专题图";
                        const special = type;
                        copy = deepCopy(child);
                        copy = {
                            ...copy,
                            key,
                            id: key,
                            name,
                            title: name,
                            special,
                            icon: iconfont,
                        };
                        if (copy.key !== child.key) {
                            valid = true;
                        }
                    }
                }
                return child;
            });
            if (valid && position > 0) {
                result.splice(position, 0, copy);
            }
            group.children = result;
        }
    }

    return group;
}

export default GroupLayer;
