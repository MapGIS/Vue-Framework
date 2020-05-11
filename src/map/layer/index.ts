import { BackGroundLayer } from "./background";
import { BackColorLayer } from './backcolor';
import { RasterTileLayer, RasterLayerType } from "./rastertile";
import { VectorTileLayer } from "./vectortile";
import { GeoJsonLayer } from './geojson';
import { IgsLayerType, IgsLayerTypeDefine, IgsDocLayer, IgsWmsLayer } from './igserver';

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
    BackColorLayer,
    RasterTileLayer,
    RasterLayerType,
    VectorTileLayer,
    GeoJsonLayer,

    IgsLayerType,
    IgsLayerTypeDefine,
    IgsDocLayer,
    IgsWmsLayer,

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
