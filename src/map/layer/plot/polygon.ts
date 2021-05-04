import { PlotBaseLayer } from './base';

export const PlotPolygonId = "标绘-区图层";

export class PlotPolygonLayer extends PlotBaseLayer {

    constructor() {
        super();
        this.subtype = "Fill";
        this.id = this.key = this.name = this.title = PlotPolygonId;

        const style: any = {
            "fill-outline-color": '#000000',
            "fill-color": '#666666'
        }
        this.style = style;
    }

}
