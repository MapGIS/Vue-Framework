import { ILayer, LayerType } from "./baselayer";
import { Bounds } from "../map";

export enum IgsLayerType {
  /**IGServer图层 */
  IgsDocLayer = "IgsDocLayer",
  IgsTileLayer = "IgsTileLayer",
  IgsVectorLayer = "IgsVectorLayer",
  IgsWmsLayer = "IgsWmsLayer",
  IgsWmtsLayer = "IgsWmtsLayer",
  IgsTdtLayer = "IgsTdtLayer",
  IgsArcgisLayer = "IgsArcgisLayer",
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
  IgsTdtLayer: {
    type: "raster",
    subtype: "IgsTdtLayer",
    name: "天地图服务",
  },
  IgsArcgisLayer: {
    type: "raster",
    subtype: "IgsArcgisLayer",
    name: "ArcGIS服务",
  },
};

class IgsLayer extends ILayer {
  protocol: string;
  ip: string;
  port: string;

  serverName?: string;
  serverType?: string;
  layers?: Array<string> | string;

  /**
   * @description domain 是[protocol]://[ip]:[port]的连写 如:https://localhost:6163
   */
  domain?: string;

  /**
   * @descrition 完整的地图请求路径。
   */
  url?: string;

  constructor(l?: IgsLayer) {
    super(l);

    if (!l) return;

    if (l.ip) this.ip = l.ip;
    if (l.port) this.port = l.port;
    if (l.domain) this.domain = l.domain;
    if (l.serverName) this.serverName = l.serverName;
  }

  /**
   * @param url
   * @description 解析url的值,提取对应的值并赋给对应的ip port serverName
   * @example http://localhost:6163/igs/rest/mrms/docs/EPSG_4326_WORLD
   */
  parseUrl(url) {
    const doc = "/igs/rest/mrms/docs/";
    const ipReg = "/://[a-zA-Z0-9]+:*/g";
    const portReg = "/:+[0-9]+//g";
    const indexServer = url.search(doc);
    const indexName = indexServer + doc.length;
    const serverName = url.substr(indexName);
    const matchIp = url.match(/\:\/\/[a-zA-Z0-9.]+\:*/g)[0];
    const matchPort = url.match(/:+[0-9]+\//g)[0];

    let ip, port;
    if (matchIp && matchIp.length > 3) {
      ip = matchIp.slice(3, matchIp.length - 1);
    }
    if (matchPort && matchPort.length > 2) {
      port = matchPort.slice(1, matchPort.length - 1);
    }

    if (this.children && this.children.length > 0) {
      let rule = "show:";
      this.children.forEach((child, i) => {
        if (!child.layout) {
          rule = rule + i + ",";
        } else if (child.layout.visible === true) {
          rule = rule + i + ",";
        } else if (child.layout["visibility"] === "visible") {
          rule = rule + i + ",";
        }
      });
      rule = rule.substr(0, rule.length - 1);
      rule = rule.length > 4 ? rule : "show:-1";
      this.layers = rule;
    }

    this.serverName = serverName || this.serverName;
    this.ip = ip || this.ip;
    this.port = port || this.port;
  }

  parseIpPort(layer?: IgsTileLayer) {
    if (layer) {
      let { ip, port, serverName, serverType } = layer;
      if (ip && port && serverName) {
        this.url = `http://${ip}:${port}/igs/rest/mrms/${serverType}/${serverName}`;
      }
    } else {
      let { ip, port, serverName, serverType } = this;
      if (ip && port && serverName) {
        this.url = `http://${ip}:${port}/igs/rest/mrms/${serverType}/${serverName}`;
      }
    }
  }

  parserDomain(layer?: IgsTileLayer) {
    if (layer) {
      let { domain, serverName, serverType } = layer;
      if (domain && serverName) {
        this.url = `${domain}/igs/rest/mrms/${serverType}/${serverName}`;
      }
    } else {
      let { domain, serverName, serverType } = this;
      if (domain && serverName) {
        this.url = `${domain}/igs/rest/mrms/${serverType}/${serverName}`;
      }
    }
  }

  parseLayer(layer: IgsTileLayer) {
    if (layer.url) {
      this.parseUrl(layer.url);
    } else if (layer.ip && layer.port) {
      this.parseIpPort();
    } else if (layer.domain) {
      this.parserDomain();
    }
  }
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

  constructor(l?: IgsDocLayer) {
    super();

    this.type = LayerType.RasterTile;
    this.subtype = IgsLayerType.IgsDocLayer;

    if (!l) return;

    let id = l.id || l.name || l.title || l.key;

    if (l.children) this.children = l.children;
    if (l.url) this.url = l.url;

    this.name = id;
    this.title = id;
    this.id = id;
    this.key = id;

    if (l.style) this.style = l.style;
    if (l.layout) this.layout = l.layout;
    if (l.ip) this.ip = l.ip;
    if (l.port) this.port = l.port;
    if (l.domain) this.domain = l.domain;
    if (l.serverName) this.serverName = l.serverName;

    this.serverType = "docs";
    this.parseLayer(l);
  }

  initQuaryParam(rect) {
    /*
    //创建查询结构对象
    var queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true;
    //是否包含属性信息
    queryStruct.IncludeAttribute = true;
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false;
    //创建一个用于查询的矩形
    var geomObj = new Zondy.Object.Rectangle(rect[0], rect[1], rect[2], rect[3]);
    //制定查询规则
    var rule = new Zondy.Service.QueryFeatureRule({
        //是否将要素的可见性计算在内
        EnableDisplayCondition: false,
        //是否完全包含
        MustInside: false,
        //是否仅比较要素的外包矩形
        CompareRectOnly: false,
        //是否相交
        Intersect: true
    });
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryParameter({
        //几何对象
        geometry: geomObj,
        //结果格式
        resultFormat: "json",
        //查询结构
        struct: queryStruct,
        //查询规则
        rule: rule
    });
    //设置查询分页号
    //设置查询要素数目
    queryParam.recordNumber = 20;
    queryParam.pageIndex = 0;
    return queryParam;
    */
    return "";
  }

  queryByRect(rect: Bounds) {
    this.initQuaryParam(rect);
  }

  queryByPoint(lng, lat, crs?: string) {
    const radiu = 0.000000001;
    const rect = [lng - radiu, lat - radiu, lng + radiu, lat - radiu];
    this.initQuaryParam(rect);
  }
}

export class IgsTileLayer extends IgsLayer {
  /**
   * @description 地图服务名
   */
  serverName?: string;

  constructor(l?: IgsTileLayer) {
    super();

    this.type = LayerType.RasterTile;
    this.subtype = IgsLayerType.IgsTileLayer;

    if (!l) return;

    let id = l.id || l.name || l.title || l.key;

    if (l.children) this.children = l.children;
    if (l.url) this.url = l.url;

    this.name = id;
    this.title = id;
    this.id = id;
    this.key = id;

    if (l.style) this.style = l.style;
    if (l.layout) this.layout = l.layout;
    if (l.ip) this.ip = l.ip;
    if (l.port) this.port = l.port;
    if (l.domain) this.domain = l.domain;
    if (l.serverName) this.serverName = l.serverName;

    this.serverType = "tile";

    this.parseLayer(l);
  }
}

export class IgsVectorLayer extends IgsLayer {
  /**
   * @description 地图服务名
   */
  gdbp?: string;

  constructor(l?: IgsVectorLayer) {
    super(l);

    this.type = LayerType.RasterTile;
    this.subtype = IgsLayerType.IgsVectorLayer;

    if (!l) return;

    if (l.gdbp) this.gdbp = l.gdbp;

    this.serverType = "layers";

    this.parseLayer(l);
  }

  parserDomain(layer?: IgsTileLayer) {
    if (layer) {
      let { domain, serverType } = layer;
      if (domain) {
        this.url = `${domain}/igs/rest/mrms/${serverType}`;
      }
    } else {
      let { domain, serverType } = this;
      if (domain) {
        this.url = `${domain}/igs/rest/mrms/${serverType}`;
      }
    }
  }
}

export class IgsWmsLayer extends IgsLayer {
  serverType: string;
  serverName: string;
  layers: Array<string>;

  constructor(l?: ILayer) {
    super();
    if (!l) return;

    this.type = LayerType.RasterTile;
    this.subtype = IgsLayerType.IgsWmsLayer;

    if (l.children) this.children = l.children;
    if (l.url) this.url = l.url;
    if (l.name) this.name = l.name;
    if (l.title) this.title = l.title;
    if (l.id) this.id = l.id;
    if (l.key) this.key = l.key;
    if (l.style) this.style = l.style;
    if (l.layout) this.layout = l.layout;

    this.serverType = "wms";

    this.parseLayer(this);
  }
}
