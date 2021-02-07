import { MapRender } from "../document";
import { deepCopy, deepEqual } from "../../utils/deepequal";

export enum SourceType {
    Default = "Default",
    IGServer = "IGServer",
    DataStore = "DataStore",
    GeoJson = "GeoJson",
    VectorTile = "VectorTile",
    RasterTile = "RasterTile",
}

export class Source {
    static parseIpPort(url: string): { ip: string; port: string } {
        if (!url) {
            return;
        }
        const ips = url.match(/\:\/\/[a-zA-Z0-9.]+\:*/g);
        const ports = url.match(/:+[0-9]+\//g);
        const matchIp = ips ? ips[0] : "://localhost";
        const matchPort = ports ? ports[0] : ":6163";

        let ip;
        let port;
        if (matchIp && matchIp.length > 3) {
            ip = matchIp.slice(3, matchIp.length - 1);
        }
        if (matchPort && matchPort.length > 2) {
            port = matchPort.slice(1, matchPort.length - 1);
        }
        return { ip, port };
    }

    static parseSources(sources: object, mapRender: MapRender) {
        const result = deepCopy(sources);
        if (mapRender === MapRender.MapBoxGL) {
            for (const key of Object.keys(result)) {
                const source = result[key];
                let type = "vector";
                switch (source.type) {
                    case SourceType.VectorTile:
                        type = "vector";
                        break;
                    case SourceType.RasterTile:
                        type = "raster";
                        break;
                    case SourceType.GeoJson:
                        type = "geojson";
                        break;
                }
                source.type = type;
                source.tiles = [source.url];
                source.minZoom = source.min;
                source.maxZoom = source.max;
            }
        } else if (mapRender === MapRender.Cesium) {
            // Cesium 格式解析
        }
        return result;
    }

    /**
     * @description 将新的数据源添加到数据源集合对象中
     * @param sources - {Object} 数据源集合对象
     * @param sourceKey - {string} 新增数据源名称
     * @param sourceValue - {Source} 新增数据源值
     * @param sources - {MapRender} 地图渲染引擎
     **/
    static addSource(
        sources: object,
        sourceValue: Source,
        sourceKey: string,
        mapRender?: MapRender
    ) {
        const news: object = deepCopy(sources);
        if (!mapRender || mapRender === MapRender.MapBoxGL) {
            news[sourceKey] = sourceValue;
        } else {
            //         news[sourceKey] = sourceValue;
        }
        return news;
    }

    static compareSource(sourcea: Source, sourceb: Source) {
        if (!sourcea || !sourceb) {
            return false;
        } else if (sourcea.type !== sourceb.type) {
            return false;
        } else if (sourcea.url !== sourceb.url) {
            return false;
        }
        return true;
    }

    static compareSources(sourcesa: object, sourcesb: object) {
        if (!sourcesa || !sourcesb) {
            return false;
        }
        if (deepEqual(sourcesa, sourcesb)) {
            return true;
        }
        const KEYS_A = Object.keys(sourcesa);
        const KEYS_B = Object.keys(sourcesb);
        if (KEYS_A.length !== KEYS_B.length) {
            return false;
        }
    }

    name: string;
    type: SourceType;
    url: string;
    min?: number;
    max?: number;
    description?: string;
}

export const defaultSource: Source = {
    name: "默认数据源",
    type: SourceType.Default,
    url: "localhost",
    min: 0,
    max: 24,
    description:
    "默认数据源提供一个默认的空的背景底图，该底图不显示作为游标定位其他图层.默认数据源前端代码内置的无法删除.",
};

export const vtSource: Source = {
    name: "默认矢量瓦片数据源",
    type: SourceType.VectorTile,
    url:
    "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片数据/{z}/{y}/{x}?type=cpbf",
    min: 0,
    max: 24,
    description: "IGServer矢量瓦片数据源测试案例.",
};

export const datastoreSource: Source = {
    name: "默认大数据数据源",
    type: SourceType.DataStore,
    url: "http://192.168.96.101:9091",
    min: 0,
    max: 24,
    description: "DataStore大数据数据源测试案例.",
};

export const defaultSources: object = {
    默认数据源: defaultSource,
    默认矢量瓦片数据源: vtSource,
    默认大数据数据源: datastoreSource,
};
