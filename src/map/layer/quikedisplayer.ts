import { ILayer, IMetadata } from "./baselayer";
import { GeoBounds } from "../map";
import { Crs } from "../crs";

export class QuikerDisplayMetadata extends IMetadata {
  geomtype?: number;
  count?: number;
  range?: GeoBounds;
  srefid?: number;
  /**
   * @member 线/区的化简抽稀像素容差，单位像素
   */
  tolerance?: number;
  /**
   * @member 线/区的过滤抽稀像素容差，单位像素
   */
  filter?: number;

  constructor() {
    super();
    this.srefid = 11; // 默认WGS1984_度,crs/mapgis.ts里面有记录
    this.crs = Crs.MapgisToEpsg(this.srefid);
    this.topleftcorner = [-180, 90];
    this.tolerance = 0;
    this.filter = 0;
  }
}

export class QuikerDisplayLayer extends ILayer {
  metadata: QuikerDisplayMetadata;
  constructor() {
    super();
  }

  fixUrl() {
    let url = this.url;
    let { tolerance, filter } = this.metadata;
    let reg = RegExp("tolerance=(d+)&filter=(d+)", "gi");
    let rep = `tolerance=${tolerance}&filter=${filter}`;
    this.url = url.replace(reg, rep);
  }
}

export default QuikerDisplayLayer;
