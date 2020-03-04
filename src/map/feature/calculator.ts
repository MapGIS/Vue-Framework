import { MapRender } from '../document';

export class Calculator {
    static getFeatures(map, render: MapRender, type,
        filter?: Array<any>, ids?: Array<string>) {
        let result = [];
        let layerIds = [];
        if (render == MapRender.MapBoxGL) {
            if (ids && ids.length > 0) {
                layerIds = ids;
            } else {
                const { layers } = map.getStyle();
                if (layers) {
                    layers
                        .filter(layer => layer.type === type)
                        .forEach(layer => layerIds.push(layer.id));
                }
            }
            let options = { layers: layerIds, filter: filter };
            result = map.queryRenderedFeatures(/* bounds, */ options);
            //let bounds = map.getBounds().toArray();
            //console.log("queryRenderedFeatures", result, layerIds, bounds, options);
        }

        return result;
    }

    static getLayerFeatures(map, render: MapRender, id, type,
        filter?: Array<any>, ids?: Array<string>) {
        let result = [];
        let layerIds = [];
        if (render == MapRender.MapBoxGL) {
            if (ids && ids.length > 0) {
                layerIds = ids;
            } else {
                const { layers } = map.getStyle();
                if (layers) {
                    layers
                        .filter(layer => layer.type === type)
                        .forEach(layer => { if (id == layer.id) { layerIds.push(layer.id) } });
                }
            }
            let options = { layers: layerIds, filter: filter };
            let bbox = [[0, 1000], [1000, 0]];
            result = map.queryRenderedFeatures(bbox, options);
        }
        //let bounds = map.getBounds().toArray();
        //console.log("queryRenderedFeatures", result, layerIds, bounds, options);

        return result;
    }
}

