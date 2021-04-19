import {
    DataDrivenPropertyValueSpecification,
    ColorSpecification,
} from "@mapbox/mapbox-gl-style-spec/types";
import { IDocument, MapRender } from "../document";

export class BaseTheme {
    name: string;
    color: DataDrivenPropertyValueSpecification<ColorSpecification>;
}

const randomColors = ["#e4e4e4", "#ffffff", "#0079c1"];

export interface ThemeAction {
    apply: (doc: IDocument, layerid: string) => IDocument
}

export class Theme {
    static setTheme(id, theme, map, render: MapRender, type) {
        if (render === MapRender.MapBoxGL) {
            const { layers } = map.getStyle();

            if (layers) {
                layers
                    .filter((layer) => layer.id === id)
                    .forEach((layer) => {
                        switch (type) {
                            case "circle":
                                theme.color = theme.color || "#0079c1";
                                map.setPaintProperty(id, "circle-color", theme.color);
                                break;
                            case "line":
                                theme.color = theme.color || "#0079c1";
                                map.setPaintProperty(id, "line-color", theme.color);
                                break;
                            case "fill":
                                theme.color = theme.color || "#0079c1";
                                map.setPaintProperty(id, "fill-color", theme.color);
                                break;
                            case "fill-extrusion":
                                theme.color = theme.color || "#0079c1";
                                map.setPaintProperty(id, "fill-extrusion-color", theme.color);
                                break;
                        }
                    });
            }
        }
    }

    /**
     * @description 遍历地图对象，将所有图层的基本颜色提取成数据
     */
    static getThemes(map, render: MapRender, type): BaseTheme[] {
        const themes = [];
        if (render === MapRender.MapBoxGL) {
            const { layers } = map.getStyle();

            if (layers) {
                layers
                    .filter((layer) => layer.type === type)
                    .forEach((layer) => {
                        const theme = {
                            name: layer.id,
                            color: "#0079c1",
                        };
                        switch (type) {
                            case "circle":
                                theme.color = layer.paint["circle-color"] || theme.color;
                                break;
                            case "line":
                                theme.color = layer.paint["line-color"] || theme.color;
                                break;
                            case "fill":
                                theme.color = layer.paint["fill-color"] || theme.color;
                                break;
                            case "fill-extrusion":
                                theme.color =
                                    layer.paint["fill-extrusion-color"] || theme.color;
                                break;
                        }
                        themes.push(theme);
                    });
            }
        }

        return themes;
    }

    static getThemeByArray(array: BaseTheme[], name: string) {
        const result = array.filter((theme) => {
            return theme.name === name;
        });
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    static getThemeById(map, render: MapRender, id: string): BaseTheme {
        const index = (Math.random() * 10) / randomColors.length;
        const theme = {
            name: id,
            color: randomColors[index],
        };
        let tempColor;
        if (render === MapRender.MapBoxGL) {
            const { layers } = map.getStyle();

            if (layers) {
                layers
                    .filter((layer) => layer.id === id)
                    .forEach((layer) => {
                        switch (layer.type) {
                            case "circle":
                                if (layer.paint) {
                                    tempColor = layer.paint["circle-color"];
                                }
                                break;
                            case "line":
                                if (layer.paint) {
                                    tempColor = layer.paint["line-color"];
                                }
                                break;
                            case "fill":
                                if (layer.paint) {
                                    tempColor = layer.paint["fill-color"];
                                }
                                break;
                            case "fill-extrusion":
                                if (layer.paint) {
                                    tempColor = layer.paint["fill-extrusion-color"];
                                }
                                break;
                            case "symbol":
                                if (layer.paint) {
                                    tempColor = layer.paint["text-color"];
                                }
                                break;
                        }
                        if (typeof tempColor === "string") {
                            theme.color = tempColor;
                        }
                    });
            }
        }
        return theme;
    }


}
