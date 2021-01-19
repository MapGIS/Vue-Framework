import {
    Story
} from "./style/story";

import {
    LayerType,
    ILayer,
    defaultId,
    BackGroundLayer,
    RasterTileLayer,
    VectorTileLayer,
    changeLayersVisible,
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
    loopLayerStyle,
    loopLayerVisible,
    forceLayerVisible,
    loopLayerPosition,
} from "./layer/grouplayer";

import {
    moveArray
} from "../utils/array";

import {
    uuid
} from "../utils/uuid";

import {
    deepCopy
} from "../utils/deepequal";

import {
    Bounds,
    defaultBounds,
    Position,
    defaultPosition
} from "./map";

import {
    defaultService
} from "./service/defaultservice";

import {
    defaultSources,
    Source
} from "./source/source";

import {
    Crs,
    defaultCrs
} from "./crs/crs";

import {
    Convert
} from "./layer/convert";

export enum MapRender {
    MapBoxGL = "mapboxgl",
    Cesium = "cesium",
}

export class Current {
    id: string;
    type: LayerType;
    name?: string;
}

export const defaultCurrent = {
    id: defaultId,
    type: LayerType.UnKnow,
    name: defaultId,
};

export const defaultLayers: ILayer[] = [];
export const defaultSource = defaultSources;
export const defaultName = "默认地图文档";
export const defaultSprites = "static/sprites/sprite-mapgis";
export const defaultGlyphs = "static/font/{fontstack}/{range}.pbf";

/**
 * @author 潘卓然
 * @description 通用地图文档接口
 */
export class IDocument {
    static clone(document: IDocument): IDocument {
        if (!document) { return undefined; }
        const {
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
            story,
        } = document;
        const copy = new IDocument(
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

        copy.layout = document.layout;
        copy.widget = document.widget;
        copy.story = Story.wrapper(story);

        return copy;
    }

    static deepclone(document: IDocument): IDocument {
        if (!document) { return undefined; }
        const {
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
            crs,
            story,
        } = document;
        const newLayers = [];

        if (!document.layers) { return document; }

        layers.forEach((layer) => {
            const newLayer = deepCopy(layer);
            newLayers.push(newLayer);
        });

        const copy = new IDocument(
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

        copy.layout = deepCopy(document.layout);
        copy.widget = deepCopy(document.widget);
        copy.story = Story.wrapper(story);

        return copy;
    }

    static deepCopy(document: IDocument): IDocument {
        return deepCopy(document);
    }

    /**
     * @description 包装类-将Vuex/Redux的json对象构建一个Class对象,使其能调用地图文档的方法
     * @info Redux/Vuex传递的是一个json序列化格式而不是一个Object/Class对象
     **/
    static Wrapper(document: IDocument): IDocument {
        return this.clone(document);
    }

    /**
     * @description 深克隆包装类-将Vuex/Redux的json对象构建一个Class对象,使其能调用地图文档的方法
     * @info Redux/Vuex传递的是一个json序列化格式而不是一个Object/Class对象
     **/
    static DeepWrapper(document: IDocument): IDocument {
        return this.deepclone(document);
    }

    /**
     * @description 默认地图文档
     **/
    static Default(): IDocument {
        return deepCopy(defaultDocument);
    }

    /**
     * @desription 通过options鸭式结构创建地图文档
     * @param {Object} options 传入参数
     * @param {Object} options.name 样式名称
     * @param {Object} options.current 当前选择图层
     * @param {Object} options.backgrounds 背景图层组
     * @param {Object} options.layers 图层/图层组
     * @param {Object} options.sources 数据源
     * @param {Object} options.maprender 渲染引擎
     * @param {Object} options.bounds 当前地图范围
     * @param {Object} options.maxbounds 当前地图最大范围
     * @param {Object} options.sprite 符号库
     * @param {Object} options.glyphs 字体库
     * @param {Object} options.service 服务信息
     * @param {Object} options.crs 参考系
     **/
    static CreateByOptions(options) {
        const {
            name, current, backgrounds, layers,    // 地图文档
            sources, service,                      // 数据源与服务
            sprite, glyphs,                        // 符号库
            maprender, crs, center, bounds, maxbounds,     // 地图信息
        } = options;

        const doc = new IDocument(
            name || deepCopy(defaultName),
            current || deepCopy(defaultCurrent),
            backgrounds || [],
            layers || [],
            sources || deepCopy(defaultSources),
            maprender ||  deepCopy(MapRender.MapBoxGL),
            bounds || deepCopy(defaultBounds),
            sprite || deepCopy(defaultSprites),
            glyphs || deepCopy(defaultGlyphs),
            service || deepCopy(defaultService),
            crs || deepCopy(defaultCrs)
        );

        doc.center = center || doc.center || defaultPosition;
        doc.maxbounds = maxbounds || doc.maxbounds || defaultBounds;

        return doc;
    }

    /**
     * @member 地图文档名称
     */
    name: string;

    /**
     * @member 当前激活图层
     * @description 只支持单图层激活
     */
    current: Current;

    /**
     * @member 渲染引擎
     */
    maprender: MapRender;

    /**
     * @member 背景图层组
     */
    backgrounds: BackGroundLayer[];

    /**
     * @member 图层/图层组
     */
    layers: ILayer[];

    /**
     * @member 数据源数组
     * @description 用对象的键值来表示不同的数据源
     */
    sources: object;

    /**
     * @member 服务数组
     */
    service?: object;

    /**
     * @member 地图库
     * @link http://develop.smaryun.com:8899/#/helper/mapboxgl/vectortile/style
     */
    sprite?: string;

    /**
     * @member 字体库
     * @link http://develop.smaryun.com:8899/#/helper/mapboxgl/vectortile/style
     */
    glyphs?: string;

    /**
     * @member 中心点
     */
    center?: Position;

    /**
     * @member 地图当前边界
     */
    bounds?: Bounds;

    /**
     * @member 地图最大边界
     */
    maxbounds?: Bounds;

    /**
     * @member 堆顶图层
     */
    before?: string;

    /**
     * @member 地图参考系
     * @link http://develop.smaryun.com:8899/#/standard/epsg
     */
    crs?: Crs;

    /**
     * @member 界面布局
     */
    layout?: object;

    /**
     * @member 界面部件
     */
    widget?: object;

    /**
     * @member 地图故事
     */
    story?: Story;

    /**
     * @description 构造函数
     * @see 如果需要针对构造函数新增新的属性，请不要在构造函数后面追加参数，请使用IDocument.CreateByOptions(options)的方式
     **/
    constructor(
        name?: string,
        current?: Current,
        backgrounds?: BackGroundLayer[],
        layers?: ILayer[],
        sources?: object,
        maprender?: MapRender,
        bounds?: Bounds,
        sprite?: string,
        glyphs?: string,
        service?: object,
        crs?: Crs
    ) {
        this.name = name ? name : defaultName;
        this.current = current ? current : defaultCurrent;
        this.backgrounds = backgrounds ? backgrounds : [defaultBack];
        this.layers = layers ? layers : [];
        this.sources = sources ? sources : defaultSources;
        this.service = service ? service : defaultService;
        this.maprender = maprender ? maprender : MapRender.MapBoxGL;
        this.bounds = bounds ? bounds : defaultBounds;
        this.maxbounds =  defaultBounds;
        this.sprite = sprite ? sprite : defaultSprites;
        this.glyphs = glyphs ? glyphs : defaultGlyphs;
        this.crs = crs ? crs : defaultCrs;
        this.layout = {};
        this.widget = { drag: {}, slot: [] };
        this.story = new Story();
    }

    getBackgrouds() {
        return this.backgrounds;
    }

    getSources() {
        return this.sources;
    }

    getCurrent(document?: IDocument) {
        if (!document) { return this.current; }
        if (!document) { return defaultCurrent; }
        if (!document.current) { return defaultCurrent; }
        return document.current;
    }

    getCurrentLayers() {
        if (this.current.type === LayerType.UnKnow) {
            return [defaultLayer];
        }
        if (this.current.type === LayerType.BackGround) {
            return this.backgrounds;
        }
        if (
            this.current.type === LayerType.VectorTile ||
                this.current.type === LayerType.RasterTile
        ) {
            return this.getLayersById(this.current.id);
        } else {
            return this.getLayersById(this.current.id);
        }
        return [defaultLayer];
    }

    getCurrentLayer() {
        if (this.current.type === LayerType.UnKnow) {
            return defaultLayer;
        }
        if (this.current.type === LayerType.BackGround) {
            if (this.backgrounds && this.backgrounds.length >= 1) {
                return this.backgrounds[0];
            }
        }
        if (
            this.current.type === LayerType.VectorTile ||
                this.current.type === LayerType.RasterTile
        ) {
            const results = this.getLayersById(this.current.id);
            if (results && results.length >= 1) {
                return results[0];
            }
        } else {
            const results = this.getLayersById(this.current.id);
            if (results && results.length >= 1) {
                return results[0];
            }
        }
        return defaultLayer;
    }

    getCurrentInfo() {
        const layers = this.getCurrentLayers();
        let info;
        if (layers && layers.length >= 1) {
            const layer = layers[0];
            switch (layer.type) {
                case LayerType.BackGround:
                    info = layer.info;
                    if (layer instanceof BackGroundLayer) {
                        // backgournd
                    }
                    break;
                case LayerType.RasterTile:
                    info = layer.info;
                    if (layer instanceof RasterTileLayer) {
                        // <RasterTileLayer>layer).info do not work
                    }
                    break;
                case LayerType.VectorTile:
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
        const layers = this.getCurrentLayers();
        let style;
        if (layers && layers.length >= 1) {
            const layer = layers[0];
            switch (layer.type) {
                case LayerType.BackGround:
                    style = layer.style;
                    if (layer instanceof BackGroundLayer) {
                        // backgournd
                    }
                    break;
                case LayerType.RasterTile:
                    style = layer.style;
                    if (layer instanceof RasterTileLayer) {
                        // <RasterTileLayer>layer).style do not work
                    }
                    break;
                case LayerType.VectorTile:
                    break;
            }
        }
        return style;
    }

    getCurrentStory() {
        if (!this.story || !this.story.books || this.story.current === "") {
            return undefined;
        }
        const book = this.story.getCurrentBook();
        return book;
    }

    getCurrentLayout() {
        const layers = this.getCurrentLayers();
        let layout;
        if (layers && layers.length >= 1) {
            const layer = layers[0];
            switch (layer.type) {
                case LayerType.BackGround:
                    layout = layer.layout;
                    if (layer instanceof BackGroundLayer) {
                        // background
                    }
                    break;
                case LayerType.RasterTile:
                    layout = layer.layout;
                    if (layer instanceof RasterTileLayer) {
                        // <RasterTileLayer>layer).layout do not work
                    }
                    break;
                case LayerType.VectorTile:
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
        const current = defaultCurrent;

        for (let i = 0; i < this.backgrounds.length; i++) {
            const back = this.backgrounds[i];
            if (back.id === id) {
                current.id = back.id;
                current.type = LayerType.BackGround;
                current.name = back.name;
                return current;
            }
        }

        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if (layer.type === LayerType.GroupLayer) {
                const find = findLayer(id, layer);
                if (find) {
                    current.id = find.id;
                    current.type = find.type;
                    current.name = find.name;
                }
            } else {
                if (layer.id === id) {
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
        this.layers.forEach((layer) => {
            if (layer.type === LayerType.GroupLayer || layer.children) {
                const flat = flatLayers(layer, filtergroup);
                flats = flats.concat(flat);
            } else {
                flats.push(layer);
            }
        });
        return flats;
    }

    /**
     * @description 针对图层进行对应的处理，满足条件的返回处理后的图层，否则返回原始图层
     * @param {Boolean} [filtergroup=true] 是否过滤组图层,默认true剔除组图层
     * @param {Boolean} [remove=true] 是否移除非必要属性,默认false保留所有属性
     * @return {Array<ILayer>} layers
     */
    getConvertLayers(filtergroup: boolean = true, remove: boolean = false) {
        const conv = new Convert();
        const layers = conv.docTomvtLayers(this, remove);
        return layers;
    }

    getCheckedLayers(document?: IDocument) {
        const checkedKeys = [];
        let flats;
        let idoc;
        if (document) {
            idoc = IDocument.clone(document);
            flats = idoc.getFlatLayers();
        } else {
            flats = this.getFlatLayers();
        }

        flats.forEach((layer) => {
            if (
                (!layer.layout && layer.type !== LayerType.GroupLayer) ||
                    (layer.layout && layer.layout.visible === true)
            ) {
                checkedKeys.push(layer.id);
            } else if (
                layer.type === LayerType.GroupLayer &&
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
        return this.layers.reduce((total, layer, index, arr) => {
            let result = [];
            if (layer.type === LayerType.GroupLayer) {
                result = findLayersByType(type, layer);
            } else {
                if (layer.type === type) {
                    result.push(layer);
                }
            }
            return total.concat(result);
        }, []);
    }

    getLayersById(id: string) {
        return this.layers.reduce((total, layer, index, arr) => {
            let result = [];
            if (layer.type === LayerType.GroupLayer) {
                result = findLayersById(id, layer);
            } else {
                if (layer.id === id) {
                    result.push(layer);
                }
            }
            return total.concat(result);
        }, []);
    }

    getLayerById(id: string) {
        const layers = this.layers.reduce((total, layer, index, arr) => {
            let result = [];
            if (layer.type === LayerType.GroupLayer) {
                result = findLayersById(id, layer);
            } else {
                if (layer.id === id) {
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
            this.layers = this.layers.map((group) => {
                if (
                    group.type === LayerType.GroupLayer ||
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
            const children = this.layers.map((child) => {
                return child;
            });
            const parent = { children: this.layers };
            children.map((group) => {
                group = addItemNearItem(layer, where, group, parent, before);
            });
        }
        return this.layers;
    }

    copyLayer(id: string) {
        let position = -1;
        let copy;
        this.layers = this.layers.map((layer, index) => {
            if (layer.type === LayerType.GroupLayer) {
                layer = copyGroupItem(id, layer);
            } else {
                if (layer.id === id) {
                    // 组图层复制 后面再说，先不管
                    position = index + 1;
                    const key = uuid();
                    const name = layer.title + "复制";
                    copy = deepCopy(layer);
                    copy = { ...copy, key, id: key, name, title: name };
                } else {
                    // 没找到，先不处理
                }
            }
            return layer;
        });
        if (position > 0) { this.layers.splice(position, 0, copy); }
        return this.layers;
    }

    specialLayer(id: string, type: string) {
        let position = -1;
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
        this.layers = this.layers.map((layer, index) => {
            if (layer.type === LayerType.GroupLayer) {
                layer = specialGroupItem(id, layer, type);
            } else {
                if (layer.id === id) {
                    // 组图层复制 后面再说，先不管
                    position = index + 1;
                    const key = uuid();
                    const name = layer.title + "-" + typeName + "专题图";
                    const special = type;
                    copy = deepCopy(layer);
                    copy = {
                        ...copy,
                        key,
                        id: key,
                        name,
                        title: name,
                        special,
                        icon: iconfont,
                    };
                }
            }
            return layer;
        });
        if (position > 0) { this.layers.splice(position, 0, copy); }
        return this.layers;
    }

    deleteLayer(id: string) {
        this.layers = this.layers.filter((layer) => {
            if (layer.type === LayerType.GroupLayer) {
                if (layer.id === id) { return false; }
                layer = deleteGroupItem(id, layer);
                return true;
            } else {
                if (layer.id === id) {
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
    fixGroupLayer() {
        // 先不处理
    }

    getSource(name: string): Source {
        const find = this.sources[name];
        if (find) { return find; }
        return undefined;
    }

    addSource(source: Source): object {
        const find = this.sources[source.name];
        if (find) {
            return this.sources;
        } else {
            this.sources[source.name] = source;
        }
        return this.sources;
    }

    deleteSource(name: string): object {
        const find = this.sources[name];
        if (find) {
            return (this.sources[name] = undefined);
        }
        return this.sources;
    }

    updateSource(source: Source): object {
        const update = [];
        for (const name in this.sources) {
            if (name === source.name) {
                this.sources[name] = source;
            }
        }

        return this.sources;
    }

    changeLayerVisible(id, visible: boolean) {
        const layers = this.layers;
        if (!layers) { return undefined; }

        layers.map((item) => {
            if (item.type === LayerType.GroupLayer) {
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
                        item.layout = { visible };
                    } else {
                        item.layout = {
                            ...item.layout,
                            visible,
                        };
                    }
                }
            }
        });

        return layers;
    }

    checkVisibleLayers(visibleIds) {
        this.layers = changeLayersVisible(visibleIds, this);
        return this.layers;
    }

    changeLayerPosition(id, position: number) {
        let layers = this.layers;
        if (!layers) { return undefined; }

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
        const layers = this.layers;
        if (!layers) { return undefined; }

        layers.map((item) => {
            if (item.type === LayerType.GroupLayer) {
                if (item.children) {
                    loopLayerProp(id, propName, propValue, item);
                }
            } else {
                if (item.id === id) {
                    item[propName] = propValue;
                }
            }
        });

        return layers;
    }

    changeLayerStyle(id, propName, propValue) {
        const layers = this.layers;
        if (!layers) { return undefined; }

        layers.map((item) => {
            if (item.type === LayerType.GroupLayer) {
                if (item.children) {
                    loopLayerStyle(id, propName, propValue, item);
                }
            } else {
                if (item.id === id) {
                    if (!item.style) { item.style = {}; }
                    item.style[propName] = propValue;
                }
            }
        });

        return layers;
    }
}

export const defaultMapRender: MapRender = MapRender.MapBoxGL;

export const defaultLayer: ILayer = {
    type: LayerType.UnKnow,
    name: LayerType.UnKnow,
    id: LayerType.UnKnow,
    key: LayerType.UnKnow,
};

export const defaultBack: BackGroundLayer = {
    title: "浅色背景",
    name: "MapBox浅色背景",
    id: "mapboxlight",
    key: "mapboxlight",
    description: "MapboxGL提供的浅色背景图，版本是v4, WMTS服务",
    icon: "icon-background",
    type: LayerType.BackGround,
    url: "",
    tileUrl:
    "static/tiles/EPSG3857/{z}/{x}/{y}.png",
    imgUrl:
    "https://user-images.githubusercontent.com/23654117/56859980-16e31c80-69c4-11e9-9e15-0980bd7ff947.png",
};

export const defaultBacks: BackGroundLayer[] = [ defaultBack ];

export const defaultDocument: IDocument = new IDocument(
    defaultName,
    defaultCurrent,
    defaultBacks,
    defaultLayers,
    defaultSources,
    MapRender.MapBoxGL
);

export default {
    IDocument,
    MapRender,
    Current,

    defaultCurrent,
    defaultLayers,
    defaultSource,
    defaultName,
    defaultSprites,
    defaultGlyphs,
    defaultMapRender,
    defaultLayer,
    defaultBacks,
    defaultDocument
};
