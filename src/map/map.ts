import { BBox } from "@turf/helpers";

/**
 * @class BBox
 * @see https://tools.ietf.org/html/rfc7946#section-5
 * @description 数组描述空间范围: [minx, miny, maxx, maxy].
 */
export type Extent2d = [number, number, number, number];
/**
 * @description 三维通用的空间范围
 */
export type Extent3d = [number, number, number, number, number, number];
/**
 * @description 二三维通用的空间范围
 */
export type Extent = Extent2d | Extent3d;

export class BoxBounds {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export class GeoBounds {
    west: number;
    north: number;
    east: number;
    south: number;

    constructor(west, south, east, north) {
        this.west = west;
        this.south = south;
        this.east = east;
        this.north = north;
    }

    geojson() {
        return {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [this.west, this.south],
                        [this.east, this.south],
                        [this.east, this.north],
                        [this.west, this.north],
                        [this.west, this.south],
                    ],
                ],
            },
        };
    }
}

export type CornerBounds = [[number, number], [number, number]];
export type ArrayBounds = [number, number, number, number];

export type Bounds = GeoBounds | BoxBounds | ArrayBounds | CornerBounds;

/**
 * @class Position 封装类
 * @description Position = Position2d | Position3d | Position2dArray | Position3dArray;
 */
export type Position2dArray = [number, number];
export type Position3dArray = [number, number, number];

export class Position2d {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Position3d {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

/**
 * @description 后来实际发现结合dva/redux等框架的前提下， 使用属性x/y/z存在映射问题，先使用数组形式，潘卓然
 */
export type Position /* Position2d | Position3d | */ =
    | Position2dArray
    | Position3dArray;

export enum ViewState {
    Map = "map",
    Edit = "edit",
    Query = "query",
    Print = "print",
    Layout = "layout",
}

/**
 * @see https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/API.md
 */
export enum EditState {
    SIMPLE = "simple_select",
    DIRECT = "direct_select",
    /**画点模式 */
    POINT = "draw_point",
    /**画线模式 */
    LINE_STRING = "draw_line_string",
    /**画区模式 */
    POLYGON = "draw_polygon",
    /**仿照上面DRAW_POINT的模式，实际上是 画点模式 */
    TEXT = "draw_text",
    /** 仿照上面DRAW_POLYGON的模式，实际上是调用map.trash()方法 */
    TRASH = "draw_trash",
}

export enum HighLight {
    Single = "single",
    Multi = "multi",
    None = "none",
}

export class State {
    zoom: number;
    center: Array<number>;
    bbox: BBox;
    extent: Extent;
    scale: number;
    bounds: Bounds;
    mousePosition: Position;
    viewState: ViewState;
    editState?: EditState;
    highLight?: HighLight;
    enableEventLink?: boolean;
    enableZoom?: boolean;
}

export let defaultZoom = 0;
export let defaultCenter = [0, 0];
export let defaultBbox: BBox = [-180, 90, 180, -90];
export let defaultExtent: Extent = [-180, 90, 180, -90];
export let defaultScale = 0;
export let defaultBounds: Bounds = new GeoBounds(-180, -90, 180, 90);
export let defaultPosition: [number, number, number] = [0, 0, 0];
export let defaultViewState = ViewState.Query;
export let defaultEditState = EditState.SIMPLE;
export let defaultHighLight = HighLight.None;
export let defaultEnableEventLink = false;
export let defaultEnableZoom = false;

export let defaultMapState: State = {
    zoom: defaultZoom,
    center: defaultCenter,
    bbox: defaultBbox,
    extent: defaultExtent,
    scale: defaultScale,
    bounds: defaultBounds,
    mousePosition: defaultPosition,
    viewState: defaultViewState,
    editState: defaultEditState,
    highLight: defaultHighLight,
    enableEventLink: defaultEnableEventLink,
    enableZoom: defaultEnableZoom,
};

export interface MapStateEvent {
    /**
     * @description 返回当前地图中心点位置
     */
    center(center: Position): Position;
}

export interface MapMouseEvent {
    zoom(zoom: number): number;
    scale(scale: number): number;
    /**
     * @description 返回当前地图鼠标移动的点位置
     */
    currentPosition(point: Position): Position;

    /**
     * @param event 这里的event和对应实现的地图引擎返回的e一致
     * @description 后面看看能不能针对mapv echarts的event进行处理，别忘记了
     */
    click(event: any);
}

// export {
//     ViewState,
//     EditState,
//     HighLight,
//     GeoBounds,
//     State,
//     defaultZoom,
//     defaultCenter,
//     defaultBbox,
//     defaultExtent,
//     defaultScale,
//     defaultBounds,
//     defaultPosition,
//     defaultViewState,
//     defaultEditState,
//     defaultHighLight,
//     defaultEnableEventLink,
//     defaultEnableZoom,
//     defaultMapState
// }

// export default {
//     ViewState,
//     EditState,
//     HighLight,
//     State,
//     GeoBounds,
//     defaultZoom,
//     defaultCenter,
//     defaultBbox,
//     defaultExtent,
//     defaultScale,
//     defaultBounds,
//     defaultPosition,
//     defaultViewState,
//     defaultEditState,
//     defaultHighLight,
//     defaultEnableEventLink,
//     defaultEnableZoom,
//     defaultMapState
// }
