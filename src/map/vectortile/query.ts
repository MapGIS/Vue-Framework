import { MapRender } from '../document';
const DefaultFilter = ['any', ['!=', 'mode', 'draw_polygon'], ['!=', 'meta', 'feature']];

export class Query {
    /**
     * @param {Array<any>} [options.filter] ['any', ['!=', 'mode', 'draw_polygon'],['!=', 'meta', 'feature']]
     * @param {string} options.type mapbox vectortile type(MVT) circle line fill symbol ...
     * @param {Array<string>} options.layerIds 图层名数组
     * @param {Geobounds} options.bounds 框选空间范围 [{x: 10, y:10}, {x: 20, y30}]
     */
    static getAllFeatures(map, render: MapRender, options) {
        const { type, ids, bounds } = options;
        let { filter }  = options;
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
            if (bounds) {
                result = map.queryRenderedFeatures(bounds, { layers: layerIds, filter });
            } else {
                result = map.queryRenderedFeatures({ layers: layerIds, filter });
            }
        }

        return result;
    }

    /**
     * @param {Array<any>} [options.filter] ['any', ['!=', 'mode', 'draw_polygon'],['!=', 'meta', 'feature']]
     * @param {string} options.type mapbox vectortile type(MVT) circle line fill symbol ...
     * @param {Array<string>} options.ids 图层名数组
     * @param {Geobounds} options.bounds 框选空间范围
     */
    static getLayerFeatures(map, render: MapRender, options) {
        const { type, ids, bounds } = options;
        let { filter }  = options;
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
                        .forEach((layer) => { if (layerIds.indexOf(layer.id) >= 0) { layerIds.push(layer.id) } });
                }
            }
            if (bounds) {
                result = map.queryRenderedFeatures(bounds, { layers: layerIds, filter });
            } else {
                result = map.queryRenderedFeatures({ layers: layerIds, filter });
            }
        }
        return result;
    }
}

export default Query;
