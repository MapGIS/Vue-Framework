import WMTS from "./wmts";

export enum IgsTianDiTuType {
    VEC_IGS = "vector",
    IMG_IGS = "raster",
    CVA_IGS = "vectorAnno",
    CIA_IGS = "rasterAnno",
}

export enum TianDiTuType {
    VEC = "vec",
    CVA = "cva",
    CIA = "cia",
    TER = "ter",
    IMG = "img",
}

export enum TianDiTuProj {
    LonLat = "c",
    WebMercator = "w",
}

export class TianDiTu extends WMTS {
    public Layer: TianDiTuType;
    public Proj: TianDiTuProj;
    public Igs: IgsTianDiTuType;
    public token: string;

    private BASE_URL =
        "http://t{RandomDomains}.tianditu.gov.cn/{Layer}_{Proj}/wmts?";
    private RandomDomains = [0, 1, 2, 3, 4, 5, 6, 7];

    constructor() {
        super();
        this.Layer = TianDiTuType.VEC;
        this.Proj = TianDiTuProj.LonLat;
        this.Igs = IgsTianDiTuType.VEC_IGS;
        this.TileMatrixSet = TianDiTuProj.LonLat;
        this.Format = "tiles";
    }

    getUrls(token: string) {
        const { RandomDomains } = this;
        return RandomDomains.map((index) => {
            return this.getUrl(token, index);
        });
    }

    getUrl(token: string, index: number = 0) {
        const { Layer, Proj } = this;
        const paramstr = this.getParamString();
        let url = this.BASE_URL.replace("{RandomDomains}", "" + index)
            .replace("{Layer}", Layer)
            .replace("{Proj}", Proj);
        url = url + paramstr + `&tk=${token}`;
        return url;
    }

    getIgserverUrl() {
        const { Domain, Protocol, IP, PORT, Service, Igs, token } = this;
        let baseurl;
        if (Domain) {
            baseurl = Domain;
        } else {
            baseurl = `${Protocol}://${IP}:${PORT}`;
        }
        baseurl += `/Igs/rest/cts/tianditu/{layerType}/{x}/{y}/{z}?`;
        baseurl = baseurl.replace("{layerType}", Igs) + `service=${Service}&tk=${token}`;
        return;
    }
}
