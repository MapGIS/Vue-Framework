import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";

export class VectorTileLayer extends ILayer {
  title?: string;
  imgUrl?: string;
  layout?: ILayout;
  styleUrl: string;

  /**
   * @member 线/区的化简抽稀像素容差，单位像素
   */
  tolerance?: number;
  /**
   * @member 线/区的过滤抽稀像素容差，单位像素
   */
  filter?: number;

  constructor(l?: ILayer) {
    super(l);
  }

  fixUrl?() {
    let { tolerance, filter, url } = this;
    let reg, rep;
    if (tolerance && filter) {
      if (url.indexOf("tolerance") >= 0 && url.indexOf("filter") >= 0) {
        reg = RegExp("tolerance=(d+)&filter=(d+)", "g");
        rep = `tolerance=${tolerance}&filter=${filter}`;
        this.url = url.replace(reg, rep);
      } else if (url.indexOf("tolerance") >= 0) {
        reg = RegExp("tolerance=(d+)", "g");
        rep = `tolerance=${tolerance}`;
        this.url = url.replace(reg, rep);
        this.url += `&filter=${filter}`;
      } else if (url.indexOf("filter") >= 0) {
        reg = RegExp("filter=(d+)", "g");
        rep = `filter=${filter}`;
        this.url = url.replace(reg, rep);
        this.url += `&tolerance=${tolerance}`;
      } else {
        this.url += `&tolerance=${tolerance}`;
        this.url += `&filter=${filter}`;
      }
    } else if (tolerance) {
      if (url.indexOf("tolerance") >= 0) {
        reg = RegExp("tolerance=(d+)", "g");
        rep = `tolerance=${tolerance}`;
        this.url = url.replace(reg, rep);
      } else {
        this.url += `&tolerance=${tolerance}`;
      }
    } else if (filter) {
      if (url.indexOf("filter") >= 0) {
        reg = RegExp("filter=(d+)", "g");
        rep = `filter=${filter}`;
        this.url = url.replace(reg, rep);
      } else {
        this.url += `&filter=${filter}`;
      }
    } else {
      reg = RegExp("tolerance=(d+)&filter=(d+)", "g");
      rep = ``;
      this.url = url.replace(reg, rep);
    }
  }

  static wrapper(layer) {
    let copy = new VectorTileLayer(layer);
    return copy;
  }
}

export const DefaultVectorTileLayer: VectorTileLayer = {
  type: LayerType.VectorTile,
  name: "默认标题",
  id: "DefaultVectorTile",
  key: "DefaultVectorTile",
  title: "默认标题",
  styleUrl: "",
};
