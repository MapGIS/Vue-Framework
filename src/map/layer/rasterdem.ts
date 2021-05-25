import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";

export class RasterDemLayer extends ILayer {
    title?: string;
    tileUrl?: string;
    imgUrl?: string;

    mapgisOffset?: number;
    tileSize?: number;
    minZoom?: number;
    maxZoom?: number;

    constructor() {
        super();
        this.type = LayerType.RasterDem;
    }
}
