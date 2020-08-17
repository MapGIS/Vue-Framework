import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";

export class MapvLayer extends ILayer {
  url: string;
  data?: any;
  options: Object;

  title?: string;
  layout?: ILayout;
  style?: MapvLayerStyle;

  constructor(url?: string, options?: Object) {
    super();
    this.type = LayerType.MapvLayer;
    this.url = url;
    this.options = options;
  }
}

/**
 * @class MapvLayerStyle
 * @description MapvLayer样式
 */
export class MapvLayerStyle extends IStyle {}

/**
 * @class MapvLayerLayout
 * @description MapvLayer布局
 */
export class MapvLayerLayout extends ILayout {
  visible?: boolean;

  constructor(visible: boolean) {
    super();
    this.visible = visible;
  }

  setOpacity(visible: boolean) {
    this.visible = visible;
  }
}
