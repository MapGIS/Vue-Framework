import { PlotBaseLayer } from './base';

export const PlotPolygonId = "标绘-区图层";

export class PlotPolygonLayer extends PlotBaseLayer {

  constructor() {
    super();
    this.subtype = "Fill";
    this.id = this.key = this.name = this.title = PlotPolygonId;
  }

}
