import { ILayer, IStyle, ILayout } from "../layer";
import { BaseLayer } from './baselayer';
import {
    PropertyValueSpecification, DataDrivenPropertyValueSpecification, ColorSpecification
} from "@mapbox/mapbox-gl-style-spec/types";
import spec from '../spec/index';

export class CircleLayer extends BaseLayer {
    layout?: ILayout;
    style?: CircleStyle;
}

// -------------------------------------CircleStyle----------------------------------
// ------------------------------------栅格样式-开始----------------------------------
// -------------------------------------CircleStyle----------------------------------
export class CircleStyle extends IStyle {
    "circle-radius"?: PropertyValueSpecification<number>;
    "circle-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "circle-blur"?: PropertyValueSpecification<number>;
    "circle-opacity"?: PropertyValueSpecification<[number, number]>;
    "circle-translate"?: PropertyValueSpecification<"map" | "viewport">;
    "circle-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
    "circle-pitch-scale"?: PropertyValueSpecification<"map" | "viewport">;

    "circle-stroke-width"?: DataDrivenPropertyValueSpecification<number>;
    "circle-stroke-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "circle-stroke-opacity"?: PropertyValueSpecification<number>;

    constructor() {
        super();
        const circle = spec.get("paint_circle")
        this["circle-blur"] = circle.get("circle-blur").default;
        this["circle-color"] = circle.get("circle-color").default;
        this["circle-blur"] = circle.get("circle-blur").default;
        this["circle-opacity"] = circle.get("circle-opacity").default;
        this["circle-translate"] = circle.get("circle-translate").default;
        this["circle-translate-anchor"] = circle.get("circle-translate-anchor").default;
        this["circle-pitch-scale"] = circle.get("circle-pitch-scale").default;

        this["circle-stroke-width"] = circle.get("circle-stroke-width").default;
        this["circle-stroke-color"] = circle.get("circle-stroke-color").default;
        this["circle-stroke-opacity"] = circle.get("circle-stroke-opacity").default;
    }

}

export const defaultCircleStyle: CircleStyle = new CircleStyle();

// -------------------------------------CircleStyle----------------------------------
// ---------------------------------------栅格样式-结束-----------------------------------
// -------------------------------------CircleStyle----------------------------------

// -------------------------------------CircleLayout----------------------------------
// ---------------------------------------栅格布局-开始-----------------------------------
// -------------------------------------CircleLayout----------------------------------
export class CircleLayout extends ILayout {
    visible?: boolean;

    constructor() {
        super();
        this.visible = true;
    }
}


export const defaultCircleLayout: CircleLayout = new CircleLayout();
// -------------------------------------CircleLayout----------------------------------
// ---------------------------------------栅格布局-结束-----------------------------------
// -------------------------------------CircleLayout----------------------------------
