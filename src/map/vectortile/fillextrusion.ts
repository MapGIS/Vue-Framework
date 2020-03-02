import { ILayer, IStyle, ILayout } from "../layer";
import { BaseLayer } from './baselayer';
import {
    PropertyValueSpecification, DataDrivenPropertyValueSpecification, ColorSpecification
} from "@mapbox/mapbox-gl-style-spec/types";

export class FillExtrusionLayer extends BaseLayer {
    public layout?: ILayout;
    public style?: FillExtrusionStyle;
}

// -------------------------------------FillExtrusionStyle----------------------------------
// ---------------------------------------栅格样式-开始-----------------------------------
// -------------------------------------FillExtrusionStyle----------------------------------
// tslint:disable-next-line:max-classes-per-file
export class FillExtrusionStyle extends IStyle {
    public opacity?: PropertyValueSpecification<number>;
    public color?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    public height: DataDrivenPropertyValueSpecification<number>;
    public base: DataDrivenPropertyValueSpecification<number>;

    constructor(
        opacity?: PropertyValueSpecification<number>,
        color?: PropertyValueSpecification<number>,
        height?: DataDrivenPropertyValueSpecification<number>,
        base?: DataDrivenPropertyValueSpecification<number>
    ) {
        super();
        this.opacity = opacity ? opacity : 1;
        this.color = color ? color : "#FFFFFF";
        this.height = height ? height : 10;
        this.base = base ? base : 0;
    }

    public setOpacity(opacity: PropertyValueSpecification<number>) {
        this.opacity = opacity;
    }

    public setHue(color: PropertyValueSpecification<number>) {
        this.color = color;
    }

    public setHeight(height: DataDrivenPropertyValueSpecification<number>) {
        this.height = height;
    }

    public setBase(base: DataDrivenPropertyValueSpecification<number>) {
        this.base = base;
    }
}

export const defaultOpacity: PropertyValueSpecification<number> = {
    stops: [[0, 1], [5, 1], [10, 1], [15, 1], [20, 1]]
};

export const defaultColor: DataDrivenPropertyValueSpecification<ColorSpecification> = "#FFFFFF";

export const defaultFillExtrusionStyle: FillExtrusionStyle = new FillExtrusionStyle(
    defaultOpacity,
    defaultColor
);

// -------------------------------------FillExtrusionStyle----------------------------------
// ---------------------------------------栅格样式-结束-----------------------------------
// -------------------------------------FillExtrusionStyle----------------------------------

// -------------------------------------FillExtrusionLayout----------------------------------
// ---------------------------------------栅格布局-开始-----------------------------------
// -------------------------------------FillExtrusionLayout----------------------------------
// tslint:disable-next-line:max-classes-per-file
export class FillExtrusionLayout extends ILayout {
    public visible?: boolean;

    constructor(visible: boolean) {
        super();
        this.visible = visible;
    }
}

export const defaultVisible: boolean = true;

export const defaultFillExtrusionLayout: FillExtrusionLayout = new FillExtrusionLayout(
    defaultVisible
);
// -------------------------------------FillExtrusionLayout----------------------------------
// ---------------------------------------栅格布局-结束-----------------------------------
// -------------------------------------FillExtrusionLayout----------------------------------
