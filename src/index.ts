/**
 * @description 地图文档类
 */
import Doc from "./map/document";

/**
 * @description 地图文档抽象类
 */
import { IDocument } from "./map/document";

import Enum from "./map/enum";

import Crs from "./map/crs";
import Ellipsoid from "./map/ellipsoid";
import Source from "./map/source";

import Map from "./map/map";
import Layer from "./map/layer";
import Feature from "./map/feature";
import Geometry from "./map/geom";
import VectorTile from "./map/vectortile";

import Format from "./map/format";

import Theme from "./map/theme";
import Spec from "./map/spec";
import Style from "./map/style";

/**
 * @description 这个typescript如果要使用的话只能通过
 * import {MapEvent} from '@mapgis/webclient-store' 的方式
 **/
import { MapEvent, BoundEvent } from "./map/mapevent";

import Services from "./map/service";

import Util from "./utils";

export {
  Enum,
  Services,

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

  Format,

  Style,
  Theme,
  Spec,

  Util,
};

export default {
  Enum,
  Event,
  Services,

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

  Format,

  Style,
  Theme,
  Spec,

  Util,
};
