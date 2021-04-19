import { PlotBaseLayer } from './base';

export const PlotAnnotationId = "标绘-注记图层";
export class PlotAnnotationLayer extends PlotBaseLayer {

    constructor() {
        super();
        this.subtype = "Symbol";

        this.id = this.key = this.name = this.title = PlotAnnotationId;
        this.icon = "icon-zhujiceng";

        const layout: any =  {
            "text-font": [
                "宋体",
                "宋体"
            ],
            "text-field": "{title}"
        };
        this.layout = layout;
    }

}
