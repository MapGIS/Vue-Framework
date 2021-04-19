import {
    GeoJSONFeature,
    GeoJSONFeatureCollection
} from '../../format/geojson';
import { GeoJsonLayer } from '../geojson';

export class PlotBaseLayer extends GeoJsonLayer {

    static Wrapper(plotlayer: GeoJsonLayer) {
        const wrapper = new PlotBaseLayer();
        const {title, key, id, name, url, data, type, subtype, style, layout} = plotlayer;
        wrapper.title = title;
        wrapper.key = key;
        wrapper.id = id;
        wrapper.name = name;
        wrapper.url = url;
        wrapper.data = data;
        wrapper.type = type;
        wrapper.subtype = subtype;
        wrapper.style = style;
        wrapper.layout = layout;
        return wrapper;
    }

    constructor() {
        super();

        this.data = {
            type: 'FeatureCollection',
            features: []
        };
    }

    initFeatures(features: GeoJSONFeature[]) {
        const data = this.data as GeoJSONFeatureCollection;
        if (data.features) {
            data.features = features;
        }
        return this;
    };

    addFeature(feature: GeoJSONFeature) {
        const data = this.data as GeoJSONFeatureCollection;
        if (data.features) {
            data.features.push(feature);
        }
        return this;
    }

    deleteFeature(feature: GeoJSONFeature) {
        const data = this.data as GeoJSONFeatureCollection;
        if (data.features) {
            data.features = data.features.filter((f) => {
                return f.id !== feature.id
            });
        }
        return this;
    }

}
