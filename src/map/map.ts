import { BBox } from "@turf/helpers";
import { MapRender } from "./document";

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

export function BoundsToMap(bounds: Bounds, map: MapRender) {
    let result = null;

    if (map == MapRender.MapBoxGL) {
        if (!map || !bounds)
            return [
                [-180, -90],
                [180, 90],
            ];

        bounds = bounds as GeoBounds;
        result = [
            [bounds.west, bounds.south],
            [bounds.east, bounds.north],
        ];
    } else if (map == MapRender.Cesium) {
    }
    return result;
}

export function MapToBounds(bounds: any, map: MapRender): GeoBounds {
    let result = null;

    if (map == MapRender.MapBoxGL) {
        if (!map || !bounds) return new GeoBounds(-180, -90, 180, 90);
        result = new GeoBounds(
            bounds.getEast(),
            bounds.getSouth(),
            bounds.getWest(),
            bounds.getNorth()
        );
    } else if (map == MapRender.Cesium) {
        const { east, south, west, north } = bounds;
        result = new GeoBounds(east, south, west, north);
    }
    return result;
}

/**
 * @class Position 封装类
 * @description Positon = Positon2d | Positon3d | Positon2dArray | Positon3dArray;
 */
export type Positon2dArray = [number, number];
export type Positon3dArray = [number, number, number];

export class Positon2d {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Positon3d {
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
export type Positon /* Positon2d | Positon3d | */ =
    | Positon2dArray
    | Positon3dArray;

enum ViewState {
    Map = "map",
    Edit = "edit",
    Query = "query",
    Print = "print",
}

/**
 * @see https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/API.md
 */
enum EditState {
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

enum HighLight {
    Single = "single",
    Multi = "multi",
    None = "none",
}

class State {
    zoom: number;
    center: Array<number>;
    bbox: BBox;
    extent: Extent;
    scale: number;
    bounds: Bounds;
    mousePosition: Positon;
    viewState: ViewState;
    editState?: EditState;
    highLight?: HighLight;
    enableEventLink?: boolean;
    enableZoom?: boolean;
}

let defaultZoom = 0;
let defaultCenter = [0, 0];
let defaultBbox: BBox = [-180, 90, 180, -90];
let defaultExtent: Extent = [-180, 90, 180, -90];
let defaultScale = 0;
let defaultBounds: Bounds = new GeoBounds(-180, -90, 180, 90);
let defaultPosition: [number, number, number] = [0, 0, 0];
let defaultViewState = ViewState.Query;
let defaultEditState = EditState.SIMPLE;
let defaultHighLight = HighLight.None;
let defaultEnableEventLink = false;
let defaultEnableZoom = false;

let defaultMapState: State = {
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
    center(center: Positon): Positon;
}

export interface MapMouseEvent {
    zoom(zoom: number): number;
    scale(scale: number): number;
    /**
     * @description 返回当前地图鼠标移动的点位置
     */
    currentPosition(point: Positon): Positon;

    /**
     * @param event 这里的event和对应实现的地图引擎返回的e一致
     * @description 后面看看能不能针对mapv echarts的event进行处理，别忘记了
     */
    click(event: any);
}

export {
    ViewState,
    EditState,
    HighLight,
    State,
    defaultZoom,
    defaultCenter,
    defaultBbox,
    defaultExtent,
    defaultScale,
    defaultBounds,
    defaultPosition,
    defaultViewState,
    defaultEditState,
    defaultHighLight,
    defaultEnableEventLink,
    defaultEnableZoom,
    defaultMapState
}

export default {
    ViewState,
    EditState,
    HighLight,
    State,
    defaultZoom,
    defaultCenter,
    defaultBbox,
    defaultExtent,
    defaultScale,
    defaultBounds,
    defaultPosition,
    defaultViewState,
    defaultEditState,
    defaultHighLight,
    defaultEnableEventLink,
    defaultEnableZoom,
    defaultMapState
}
