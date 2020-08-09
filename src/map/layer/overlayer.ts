import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";

export enum OverLayerType {
  /**通用图层 */
  Popup = "popup",
  Marker = "marker",
  UnKnow = "UnKnow",
}

export class OverLayer extends ILayer {
  title?: string;
  tileUrl?: string;
  imgUrl?: string;
  layout?: ILayout;
  style?: IStyle;

  constructor() {
    super();
    this.type = LayerType.OverLayer;
  }
}
