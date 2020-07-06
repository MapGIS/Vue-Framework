import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";
import { IDocument } from "../document";
import { uuid } from "../../utils/uuid";
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

export class GeoJsonLayer extends ILayer {
  title?: string;
  layerUrl?: string;
  layerType?: string;
  layerData?: any;
  layout?: ILayout;
  style?: GeoJsonStyle;

  constructor(name?: string, key?: string) {
    super();
    this.type = LayerType.GeoJSON;
    this.title = this.name = name || "GeoJSON";
    this.key = this.id = key || uuid();
  }
}

//-------------------------------------GeoJsonStyle----------------------------------
//---------------------------------------栅格样式-开始-----------------------------------
//-------------------------------------GeoJsonStyle----------------------------------
export class GeoJsonStyle extends IStyle {
  opacity?: PropertyValueSpecification<number>;
  hue?: PropertyValueSpecification<number>;

  constructor(
    opacity: PropertyValueSpecification<number>,
    hue: PropertyValueSpecification<number>
  ) {
    super();
    this.opacity = opacity ? opacity : 1;
    this.hue = hue ? hue : 0;
  }

  setOpacity(opacity: PropertyValueSpecification<number>) {
    this.opacity = opacity;
  }

  setHue(hue: PropertyValueSpecification<number>) {
    this.hue = hue;
  }
}

export interface IGeoJsonSytle {
  dispatchStyleChange(layer: ILayer, style: GeoJsonStyle, doc: IDocument);
  onOpacityChange(opacity: PropertyValueSpecification<number>);
  onHueChange(hue: PropertyValueSpecification<number>);
}

export const defaultOpacity: PropertyValueSpecification<number> = {
  stops: [
    [0, 1],
    [5, 1],
    [10, 1],
    [15, 1],
    [20, 1],
  ],
};

export const defaultHue: PropertyValueSpecification<number> = {
  stops: [[0, 0]],
};

export const defaultGeoJsonStyle: GeoJsonStyle = new GeoJsonStyle(
  defaultOpacity,
  defaultHue
);
//-------------------------------------GeoJsonStyle----------------------------------
//---------------------------------------栅格样式-结束-----------------------------------
//-------------------------------------GeoJsonStyle----------------------------------

//-------------------------------------GeoJsonLayout----------------------------------
//---------------------------------------栅格布局-开始-----------------------------------
//-------------------------------------GeoJsonLayout----------------------------------
export class GeoJsonLayout extends ILayout {
  visible?: boolean;

  constructor(visible: boolean) {
    super();
    this.visible = visible;
  }

  setOpacity(visible: boolean) {
    this.visible = visible;
  }
}

export const defaultVisible: boolean = true;

export const defaultGeoJsonLayout: GeoJsonLayout = new GeoJsonLayout(
  defaultVisible
);
//-------------------------------------GeoJsonLayout----------------------------------
//---------------------------------------栅格布局-结束-----------------------------------
//-------------------------------------GeoJsonLayout----------------------------------
