import * as Doc from './map/document'
import { IDocument } from './map/document'

import * as Enum from './map/enum'

import * as Crs from './map/crs'
import * as Ellipsoid from './map/ellipsoid'
import * as Source from './map/source'

import * as Map from './map/map'
import * as Layer from './map/layer'
import * as Feature from './map/feature'
import * as Geometry from './map/geom'
import * as VectorTile from './map/vectortile'

import * as Theme from './map/theme'
import * as Spec from './map/spec'
import * as Style from './map/style'

import * as Event from './map/mapevent';
import * as Service from './map/service';

import * as Util from './utils'

export const MapGIS = {
    Enum,
    Event,
    Service,

    Source,
    Ellipsoid,
    Crs,

    IDocument,
    Doc,
    Map,
    Layer,
    Feature,
    Geometry,

    VectorTile,

    Style,
    Theme,
    Spec,

    Util
};

export const MapgisEnum = Enum;
export const MapgisEvent = Event;
export const MapgisService = Service;
export const MapgisSource = Source;
export const MapgisEllipsoid = Ellipsoid;
export const MapgisCrs = Crs;
export const MapgisIDocument = IDocument;
export const MapgisMap = Map;
export const MapgisLayer = Layer;
export const MapgisFeature = Feature;
export const MapgisGeometry = Geometry;
export const MapgisVectorTile = VectorTile;
export const MapgisStyle = Style;
export const MapgisTheme = Theme;
export const MapgisSpec = Spec;

export default MapGIS;