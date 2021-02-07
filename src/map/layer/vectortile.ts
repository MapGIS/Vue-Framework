import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";

export class VectorTileLayer extends ILayer {
    static wrapper(layer) {
        const copy = new VectorTileLayer(layer);
        return copy;
    }

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
        const { tolerance, filter, url } = this;
        let reg;
        let rep;
        if (tolerance && filter) {
            if (url.indexOf("tolerance") >= 0 && url.indexOf("filter") >= 0) {
                reg = RegExp("tolerance=[0-9]+[.]*[0-9]*&filter=[0-9]+[.]*[0-9]*", "g");
                rep = `tolerance=${tolerance}&filter=${filter}`;
                this.url = url.replace(reg, rep);
            } else if (url.indexOf("tolerance") >= 0) {
                reg = RegExp("tolerance=[0-9]+[.]*[0-9]*", "g");
                rep = `tolerance=${tolerance}`;
                this.url = url.replace(reg, rep);
                this.url += `&filter=${filter}`;
            } else if (url.indexOf("filter") >= 0) {
                reg = RegExp("filter=[0-9]+[.]*[0-9]*", "g");
                rep = `filter=${filter}`;
                this.url = url.replace(reg, rep);
                this.url += `&tolerance=${tolerance}`;
            } else {
                this.url += `&tolerance=${tolerance}`;
                this.url += `&filter=${filter}`;
            }
        } else if (tolerance) {
            if (url.indexOf("tolerance") >= 0) {
                reg = RegExp("tolerance=[0-9]+[.]*[0-9]*", "g");
                rep = `tolerance=${tolerance}`;
                this.url = url.replace(reg, rep);
            } else {
                this.url += `&tolerance=${tolerance}`;
            }
        } else if (filter) {
            if (url.indexOf("filter") >= 0) {
                reg = RegExp("filter=[0-9]+[.]*[0-9]*", "g");
                rep = `filter=${filter}`;
                this.url = url.replace(reg, rep);
            } else {
                this.url += `&filter=${filter}`;
            }
        } else {
            reg = RegExp("tolerance=[0-9]+[.]*[0-9]*&filter=[0-9]+[.]*[0-9]*", "g");
            rep = ``;
            this.url = url.replace(reg, rep);
        }
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
