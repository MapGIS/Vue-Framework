import { ILayer, IStyle, ILayout } from "../layer";
import {
    PropertyValueSpecification,
    DataDrivenPropertyValueSpecification,
    ColorSpecification,
} from "@mapbox/mapbox-gl-style-spec/types";

export class GltfLayer extends ILayer {
    title?: string;
    modelUrl: string;
    minZoom?: number;
    maxZoom?: number;
    layout?: ILayout;
    style?: GltfStyle;
}

// -------------------------------------GltfStyle----------------------------------
// -----------------------------------栅格样式-开始---------------------------------
// -------------------------------------GltfStyle----------------------------------
export class GltfStyle extends IStyle {
    opacity?: PropertyValueSpecification<number>;
    color?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    height: DataDrivenPropertyValueSpecification<number>;
    base: DataDrivenPropertyValueSpecification<number>;

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

    setOpacity(opacity: PropertyValueSpecification<number>) {
        this.opacity = opacity;
    }

    setHue(color: PropertyValueSpecification<number>) {
        this.color = color;
    }

    setHeight(height: DataDrivenPropertyValueSpecification<number>) {
        this.height = height;
    }

    setBase(base: DataDrivenPropertyValueSpecification<number>) {
        this.base = base;
    }
}

export const defaultOpacity: PropertyValueSpecification<number> = {
    stops: [
        [0, 1],
        [5, 1],
        [10, 1],
        [15, 1],
        [20, 1],
    ],
};

export const defaultColor: DataDrivenPropertyValueSpecification<ColorSpecification> =
    "#FFFFFF";

export const defaultGltfStyle: GltfStyle = new GltfStyle(
    defaultOpacity,
    defaultColor
);

// -------------------------------------GltfStyle----------------------------------
// ---------------------------------------栅格样式-结束-----------------------------
// -------------------------------------GltfStyle----------------------------------

// -------------------------------------GltfLayout----------------------------------
// ---------------------------------------栅格布局-开始------------------------------
// -------------------------------------GltfLayout----------------------------------
export class GltfLayout extends ILayout {
    visible?: boolean;
    scale?: PropertyValueSpecification<number>;
    center?: number[];

    constructor(
        visible: boolean,
        center: number[],
        scale?: PropertyValueSpecification<number>
    ) {
        super();
        this.visible = visible;
        this.center = center ? center : [0, 0];
        this.scale = scale ? scale : defaultScale;
    }

    setVisible(visible: boolean) {
        this.visible = visible;
    }

    setScale(scale: PropertyValueSpecification<number>) {
        this.scale = scale;
    }

    setCenter(center: number[]) {
        this.center = center;
    }
}

export const defaultVisible: boolean = true;
export const defaultScale: PropertyValueSpecification<number> = 5.31843220338983e-5;
export const defaultCenter: number[] = [0, 0];

export const defaultGltfLayout: GltfLayout = new GltfLayout(
    defaultVisible,
    defaultScale,
    defaultCenter
);
// -------------------------------------GltfLayout----------------------------------
// ------------------------------------栅格布局-结束---------------------------------
// -------------------------------------GltfLayout----------------------------------
