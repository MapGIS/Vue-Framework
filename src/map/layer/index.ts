import { BackGroundLayer } from "./background";
import { RasterTileLayer } from "./rastertile";
import { VectorTileLayer } from "./vectortile";
import { GeoJsonLayer } from './geojson';
import { IgsLayerType, IgsLayerTypeDefine, IgsDocLayer } from './igserver';

import {
    defaultId,
    LayerType,
    LayerDefine,
    ILayer,
    ICommonAction,
    IInfo,
    IStyle,
    IFilter,
    ILayout,
    changeLayerProperty,
    getLayerById,
    changeLayerName,
    changeLayerId,
    checkLayerVisible,
    changeLayersVisible,
    compareLayers
} from './baselayer'

export {
    BackGroundLayer,
    RasterTileLayer,
    VectorTileLayer,
    GeoJsonLayer,

    IgsLayerType,
    IgsLayerTypeDefine,
    IgsDocLayer,

    defaultId,
    LayerType,
    LayerDefine,
    ILayer,
    ICommonAction,
    IInfo,
    IStyle,
    IFilter,
    ILayout,
    changeLayerProperty,
    getLayerById,
    changeLayerName,
    changeLayerId,
    checkLayerVisible,
    changeLayersVisible,
    compareLayers
}
