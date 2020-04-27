import { ILayer } from './baselayer';

export enum IgsLayerType {
  /**IGServer图层 */
  IgsDocLayer = "IgsDocLayer",
  IgsTileLayer = "IgsTileLayer",
  IgsVectorLayer = "IgsVectorLayer",
  IgsWmsLayer = "IgsWmsLayer",
  IgsWmtsLayer = "IgsWmtsLayer",
}

export let IgsLayerTypeDefine = {
  /**IGServer图层 */
  IgsDocLayer: {
    type: "raster",
    subtype: "IgsDocLayer",
    name: "地图文档",
  },
  IgsTileLayer: {
    type: "raster",
    subtype: "IgsTileLayer",
    name: "栅格瓦片",
  },
  IgsVectorLayer: {
    type: "raster",
    subtype: "IgsVectorLayer",
    name: "矢量图层",
  },
  IgsWmsLayer: {
    type: "raster",
    subtype: "IgsWmsLayer",
    name: "WMS服务",
  },
  IgsWmtsLayer: {
    type: "raster",
    subtype: "IgsWmtsLayer",
    name: "WMTS服务",
  },
};

class IgsLayer extends ILayer{
  protocol: string;
  ip: string;
  port: string;
  /**
   *
   * @param ip Igserver的ip，默认localhost
   * @param port Igserver的端口，默认6163
   */
  /* constructor(ip, port) {
    this.ip = ip;
    this.port = port;
  } */
}

enum TileFormat {
  JPG = "jpg",
  PNG = "png",
  GIF = "gif",
}

export class IgsDocLayer extends IgsLayer {
  /**
   * @description 地图服务名
   */
  serverName?: string;

  /**
   * @descrition 完整的地图请求路径。
   */
  url?: string;

  /**
   * @descrition 瓦片大小
   */
  tileSize?: number;

  /**
   * @descrition 图片的格式。当 cache 为 true 时此参数无效（仅在非动态裁图时才有意义）。jpg|png|gif
   * @type TileFormat
   */
  f?: string;

  /**
   * @descrition 投影参数设置，仅在非动态裁图时有意义，针对整个地图文档进行操作。当 cache 为 true 时此参数无效（仅在非动态裁图时才有意义）
   */
  proj?: string;

  /**
   * @description 支持懒加载,用于树控件的懒加载操作
   * @default true
   */
  expand?: boolean;

  /**
   *  @description 是否使用动态裁图功能
   */
  cache?: boolean;

  /**
   * @description 用户指定的图层过滤条件，它由多个键值对组成，值为过滤条件。当 cache 为 true 时此参数无效（仅在非动态裁图时才有意义）。
   * @example 1:ID>4,3:ID>1
   */
  filters?: string;
  /**
   * @description 指定需要被取图的图层序列号数组，以“，”分隔。默认为依据文档原始图层状态进行设置。当 cache 为 true 时此参数无效（仅在非动态裁图时才有意义）。 1、show：仅仅显示指定了图层序号的图层； 2、hide ：显示除 hide 参数指定图层外所有的图层； 3、include：除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层； 4、exclude: 从默认图层列表里删除这些被指定的图层后，进行显示。
   * @example show:1,2
   */
  layers?: string;
  /**
   * @description 是否高质量显示
   * @default false
   */
  isAntialiasing?: boolean;

  /**
   * @description 是否更新当前瓦片，仅当 cache 为 true 时有效
   * @default false
   */
  update?: boolean;

  /**
   * @description 模式，如果是快显取图（hiRender,fast_display），文档为只读，只有 bbox,w,h 有效。
   */
  mode?: string;

  constructor() {  
  // constructor(ip, port, serverName) {
    // super(ip, port);
    // this.serverName = serverName;
    super();      
  }

  /**
   * @param url
   * @description 解析url的值,提取对应的值并赋给对应的ip port serverName
   * @example http://localhost:6163/igs/rest/mrms/docs/EPSG_4326_WORLD
   */
  parseUrl(url) {
    const doc = "/igs/rest/mrms/docs/";
    const ipReg = "/://[a-zA-Z0-9]+:*/g";
    const portReg = "/:+[0-9]+\//g";
    const indexServer = url.search(doc);
    const indexName = indexServer + doc.length;
    const serverName = url.substr(indexName);
    const matchIp = url.match(/\:\/\/[a-zA-Z0-9]+\:*/g)[0];
    const matchPort = url.match(/:+[0-9]+\//g)[0];
    
    let ip, port;
    if (matchIp && matchIp.length > 3) {
      ip = matchIp.slice(3, matchIp.length - 1);
    }
    if (matchPort && matchPort.length > 2) {
      port = matchPort.slice(1, matchPort.length - 1);
    }

    if(this.children && this.children.length > 0) {
      let rule = 'show:'
      this.children.forEach((child, i) => {
        if (!child.layout) {
          rule = rule + i + ','
        } else if (child.layout.visible === true) {
          rule = rule + i + ','
        } else if (child.layout['visibility'] === 'visible') {
          rule = rule + i + ','
        }
      });
      rule = rule.substr(0, rule.length - 1)
      rule = rule.length > 4 ? rule : 'show:-1'
      this.layers = rule
    }

    this.serverName = serverName || this.serverName;
    this.ip = ip || this.ip
    this.port = port || this.port
  }

  parseLayer(layer: ILayer) {
    if(layer.url) {
      this.parseUrl(layer.url);
    }
  }
}

export class IgsWmsLayer extends IgsLayer {
  // serverName: string;
  expand: true; //支持懒加载
}
