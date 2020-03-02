import { ILayer, IStyle, ILayout } from "./baselayer";

export class BackColorLayer extends ILayer {
  title: string;
  style?: BackColorStyle;
}

//-------------------------------------BackColorStyle----------------------------------
//---------------------------------------背景样式-开始-----------------------------------
//-------------------------------------BackColorStyle----------------------------------
export class BackColorStyle extends IStyle {
  visible: boolean;
  opacity: number;
  hue: number;

  constructor(visible: boolean, opacity: number, hue: number) {
    super();
    this.visible = visible ? true : false;
    this.opacity = opacity ? opacity : 1;
    this.hue = hue ? hue : 0;
  }

  setOpacity(opacity: number) {
    this.opacity = opacity;
  }

  setHue(hue: number) {
    this.hue = hue;
  }
}

export interface IBackColorSytle {
  dispatchStyleChange(
    BackColors: Array<BackColorLayer>,
    style: BackColorStyle
  );
  onOpacityChange(opacity: number);
  onHueChange(hue: number);
}

export const defaultBackColorStyle: BackColorStyle = new BackColorStyle(
  true,
  1,
  0
);

//-------------------------------------BackColorStyle----------------------------------
//---------------------------------------背景样式-结束-----------------------------------
//-------------------------------------BackColorStyle----------------------------------

//-------------------------------------RasterTileLayout----------------------------------
//---------------------------------------栅格布局-开始-----------------------------------
//-------------------------------------RasterTileLayout----------------------------------
export class BackColorLayout extends ILayout {
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

export const defaultRasterTileLayout: BackColorLayout = new BackColorLayout(
  defaultVisible
);

//-------------------------------------RasterTileLayout----------------------------------
//---------------------------------------栅格布局-结束-----------------------------------
//-------------------------------------RasterTileLayout----------------------------------
