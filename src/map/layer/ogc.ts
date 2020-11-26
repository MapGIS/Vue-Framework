import { ILayer, LayerType } from "./baselayer";

export enum OgcLayerType {
  /**IGServer图层 */
  OgcWmsLayer = "OgcWmsLayer",
  OgcWmtsLayer = "OgcWmtsLayer",
}

export let OgcLayerTypeDefine = {
  OgcWmsLayer: {
    type: "raster",
    subtype: "OgcWmsLayer",
    name: "WMS服务",
  },
  OgcWmtsLayer: {
    type: "raster",
    subtype: "OgcWmtsLayer",
    name: "WMTS服务",
  },
};

class OgcLayer extends ILayer {
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

  constructor(l?: OgcLayer) {
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
    const ips = url.match(/\:\/\/[a-zA-Z0-9.]+\:*/g);
    const ports = url.match(/:+[0-9]+\//g);
    const matchIp = ips ? ips[0] : "://localhost";
    const matchPort = ports ? ports[0] : ":6163";

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

  parseIpPort(layer?: any) {
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

  parserDomain(layer?: any) {
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

  parseLayer(layer: any) {
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

export class OgcWmsLayer extends OgcLayer {
  serverType: string;
  serverName: string;
  layers: Array<string>;

  constructor(l?: ILayer) {
    super();
    if (!l) return;

    this.type = LayerType.RasterTile;
    this.subtype = OgcLayerType.OgcWmsLayer;

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
