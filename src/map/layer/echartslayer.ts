import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";

export class EchartsLayer extends ILayer {
    url: string;
    options: object;

    title?: string;
    layout?: ILayout;
    style?: EchartsLayerStyle;

    constructor(url?: string, options?: object) {
        super();
        this.type = LayerType.EchartsLayer;
        this.url = url;
        this.options = options;
    }
}

/**
 * @class EchartsLayerStyle
 * @description EchartsLayer样式
 */
export class EchartsLayerStyle extends IStyle {}

/**
 * @class EchartsLayerLayout
 * @description EchartsLayer布局
 */
export class EchartsLayerLayout extends ILayout {
    visible?: boolean;

    constructor(visible: boolean) {
        super();
        this.visible = visible;
    }

    setOpacity(visible: boolean) {
        this.visible = visible;
    }
}
