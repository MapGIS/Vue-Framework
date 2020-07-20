// let qs = require("querystring");

export default class WMTS {
  public Service: string = "WMTS";
  public BaseUrl: string;

  public Domain: string; // "http://localhost:6163";
  public ServerName = "";

  public Protocol: string = "http";
  public IP: string = "localhost";
  public PORT: string = "6163";

  public Version: string = "1.0.0";
  public Request: string = "GetTile";
  public Style: string = "default";
  public TileMatrixSet: string = "";
  public Format: string = "image/png";
  public Width: Number = 256;
  public Height: Number = 256;
  public Layer: string = "";
  public Tilematrix: string = "{z}";
  public TileRow: string = "{y}";
  public TileCol: string = "{x}";

  constructor() {}

  /**
   * @example http://localhost:6163/igs/rest/ogc/EPSG_4326_WORLD_TILE/WMTSServer?
   * service=WMTS&request=GetTile&version=1.0.0&style=default
   * &tilematrixSet=EPSG:4326_EPSG_4326_WORLD_TILE_arcgis_GB
   * &format=image/png&layer=EPSG_4326_WORLD_TILE&tilematrix=1&tilerow=0&tilecol=0
   * @param {string} token 密钥
   * @param {Number} domainsIndex 多网址下标
   */
  getUrl(token?, domainsIndex?) {
    const { BaseUrl, Domain, ServerName, Protocol, IP, PORT } = this;
    let url;
    const paramStrs = this.getParamString();
    if (Domain && ServerName) {
      url = `${Domain}/igs/rest/ogc/${ServerName}/WMTSServer?${paramStrs}`;
    } else if (BaseUrl) {
      url = `${BaseUrl}?${paramStrs}`;
    } else if (Protocol && IP && PORT) {
      url = `${Protocol}://${IP}:${PORT}/igs/rest/ogc/${ServerName}/WMTSServer?${paramStrs}`;
    }
    return url;
  }

  getParamString() {
    const {
      Service,
      Version,
      Style,
      Request,
      TileMatrixSet,
      Format,
      Layer,
      Height,
      Width,
      Tilematrix,
      TileRow,
      TileCol,
    } = this;

    let params = [];
    params.push("Service=" + Service);
    params.push("Request=" + Request);
    params.push("Version=" + Version);
    params.push("Style=" + Style);
    params.push("TileMatrixSet=" + TileMatrixSet);
    params.push("Format=" + Format);
    params.push("Layer=" + Layer);
    params.push("Width=" + Width);
    params.push("Height=" + Height);
    params.push("Tilematrix=" + Tilematrix);
    params.push("TileRow=" + TileRow);
    params.push("TileCol=" + TileCol);

    let qs = "" + params.join("&");
    return qs;
  }
}
