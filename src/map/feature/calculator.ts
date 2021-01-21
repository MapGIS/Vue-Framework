import { MapRender } from '../document';
import * as mapboxgl from '@mapgis/mapbox-gl';

const DefaultFilter = ['any', ['!=', 'mode', 'draw_polygon'], ['!=', 'meta', 'feature']];

export class Calculator {
    /**
     * @param {Array<any>} [options.filter] ['any', ['!=', 'mode', 'draw_polygon'],['!=', 'meta', 'feature']]
     * @param {string} options.type mapbox vectortile type(MVT) circle line fill symbol ...
     * @param {Array<string>} options.layerIds 图层名数组
     * @param {Geobounds} options.bounds 框选空间范围
     */
    static getAllFeatures(map, render: MapRender, options) {
        const { type, filter, layerIds } = options;
        let result = [];
        let layerIds = [];
        filter = filter ? filter : DefaultFilter;
        if (render === MapRender.MapBoxGL) {
            if (ids && ids.length > 0) {
                layerIds = ids;
            } else {
                const { layers } = map.getStyle();
                if (layers) {
                    layers
                        .filter((layer) => layer.type === type)
                        .forEach((layer) => layerIds.push(layer.id));
                }
            }
            if (geobound) {
                const {west, south, east, north} = bounds;
                const sw = map.project(new mapboxgl.LngLat(west, south));
                const ne = map.project(new mapboxgl.LngLat(east, north));
                result = map.queryRenderedFeatures([sw, ne], { layers: layerIds, filter });
            } else {
                result = map.queryRenderedFeatures({ layers: layerIds, filter });
            }
        }

        return result;
    }

    /**
     * @param {Array<any>} [options.filter] ['any', ['!=', 'mode', 'draw_polygon'],['!=', 'meta', 'feature']]
     * @param {string} options.type mapbox vectortile type(MVT) circle line fill symbol ...
     * @param {string} options.id 图层名
     * @param {Geobounds} options.bounds 框选空间范围
     */
    static getLayerFeatures(map, render: MapRender, options) {
        let result = [];
        let layerIds = [];
        if (render === MapRender.MapBoxGL) {
            if (ids && ids.length > 0) {
                layerIds = ids;
            } else {
                const { layers } = map.getStyle();
                if (layers) {
                    layers
                        .filter((layer) => layer.type === type)
                        .forEach((layer) => { if (id === layer.id) { layerIds.push(layer.id) } });
                }
            }
            if (geobound) {
                const {west, south, east, north} = bounds;
                const sw = map.project(new mapboxgl.LngLat(west, south));
                const ne = map.project(new mapboxgl.LngLat(east, north));
                result = map.queryRenderedFeatures([sw, ne], { layers: layerIds, filter });
            } else {
                result = map.queryRenderedFeatures({ layers: layerIds, filter });
            }
        }
        return result;
    }
}

