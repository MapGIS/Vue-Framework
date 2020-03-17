import { BackGroundLayer } from "./background";
import { RasterTileLayer } from "./rastertile";
import { VectorTileLayer } from "./vectortile";
import { IgsLayerType, IgsLayerTypeDefine } from './igserver';

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

    IgsLayerType,
    IgsLayerTypeDefine,

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
