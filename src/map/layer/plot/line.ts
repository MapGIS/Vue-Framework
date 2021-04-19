import { PlotBaseLayer } from './base';

export const PlotLineId = "标绘-线图层";

export class PlotLineLayer extends PlotBaseLayer {

  constructor() {
    super();
    this.subtype = "Line";
    this.id = this.key = this.name = this.title = PlotLineId;
  }
}
