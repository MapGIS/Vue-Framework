import { PlotBaseLayer } from './base';

export const PlotPointId = "标绘-点图层";

export class PlotPointLayer extends PlotBaseLayer {

    constructor() {
        super();
        this.subtype = "Circle";
        this.id = this.key = this.name = this.title = PlotPointId;
    }

}
