/**
 * @description 地图文档类
 */
import * as Doc from "./map/document";

/**
 * @description 地图文档抽象类
 */
import { IDocument } from "./map/document";

import * as Enum from "./map/enum";

import * as Crs from "./map/crs";
import * as Ellipsoid from "./map/ellipsoid";
import * as Sources from "./map/source";
import * as OGC from "./map/ogc";

import * as Map from "./map/map";
import * as Action from "./map/mapaction";
import * as Layer from "./map/layer";
import * as Feature from "./map/feature";
import * as Geometry from "./map/geom";
import * as VectorTile from "./map/vectortile";

import * as Format from "./map/format";

import * as Theme from "./map/theme";
import * as Spec from "./map/spec";
import * as Style from "./map/style";

import * as Layout from "./layout";
import * as Config from './map/config';

/**
 * @description 这个typescript如果要使用的话只能通过
 * import {MapEvent} from '@mapgis/webclient-store' 的方式
 **/
import * as Event from "./map/mapevent";

import * as Services from "./map/service";

import * as Util from "./utils";
import * as Flux from "./flux";



export {
  Enum,
  Event,
  Action,
  Services,
  Sources,
  Ellipsoid,
  Crs,
  OGC,
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
  Flux,
  Layout,
  Config
};

export default {
  Enum,
  Event,
  Action,
  Services,

  Sources,
  Ellipsoid,
  Crs,
  OGC,

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
  Flux,
  Layout,
  Config
};
