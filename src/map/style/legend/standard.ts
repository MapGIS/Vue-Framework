import mapboxgl from '@mapgis/mapbox-gl';

import { Legend, LegendItem } from './base'
import { IDocument, MapRender } from '../../document';
import { LayerType, SubLayerType } from '../../layer/baselayer';
import { VectorTileType } from '../../vectortile/baselayer'
import { uuid } from '../../../utils/uuid';
import { Sprite } from '../../style/sprite';

export class StandardLegend {
    sprite: Sprite;

    constructor() {
        // standard legend
    }

    getLegend(options) {
        const {map, mapRender, document} = options;
        if (document) {
            return this.getLegendByDocument(document);
        } else if (map && mapRender) {
            return this.getLegendByMap(map, mapRender);
        }
    }

    getLegendByMap(map:any, mapRender?: MapRender) {
        mapRender =  mapRender || MapRender.MapBoxGL;
        const legends = [];
        const layerObj: any = {};
        if (mapRender === MapRender.MapBoxGL) {
            if (!map) { return legends; }
            const style = map.getStyle();
            const { layers } = style;
            layers.forEach((layer) => {
                const layerName = layer["source-layer"];
                if (this.checkVectorLayer(layer)) {
                    if (layerName) {
                        if (!layerObj[layerName]) {
                            layerObj[layerName] = {
                                layer,
                                layerId: uuid(),
                                layerName,
                                legend: [],
                                maxScale: 99999999,
                                minScale: 0
                            };
                        }
                        const item = this.getLegendItemByMap(layer);
                        if (layerObj[layerName]) {
                            layerObj[layerName].legend.push(item);
                        }
                    }
                }
            });
        } else if (mapRender === MapRender.Cesium) {
            // Cesium
        }

        Object.keys(layerObj).forEach((k) => {
            const item = layerObj[k];
            // const { layerId, layerName, legend, maxScale, minScale } = item;
            const legend = new Legend(item);
            legends.push(legend);
        });

        return legends;
    }

    async initSpriteByDocument(document: IDocument) {
        const {sprite} = document;
        this.sprite = new Sprite({ json: `${sprite}.json`, png: `${sprite}.png`});
        const datas = await this.sprite.initSprite();
    }

    getLegendByDocument(document: IDocument) {
        const legends = [];
        const layerObj: any = {};
        if (!document) { return legends; }

        const layers = document.getFlatLayers();
        // this.initSpriteByDocument(document);

        layers.forEach((layer) => {
            const layerName = layer.sourceLayer || `${layer.type}_${layer.title}`;
            if (this.checkVectorLayer(layer)) {
                if (layerName) {
                    if (!layerObj[layerName]) {
                        layerObj[layerName] = {
                            layer,
                            layerId: uuid(),
                            layerName,
                            legend: [],
                            maxScale: 99999999,
                            minScale: 0
                        };
                    }
                    const item = this.getLegendItemByDocument(layer);
                    if (layerObj[layerName]) {
                        layerObj[layerName].legend.push(item);
                    }
                }
            }
        });

        Object.keys(layerObj).forEach((k) => {
            const item = layerObj[k];
            // const { layerId, layerName, legend, maxScale, minScale } = item;
            const legend = new Legend(item);
            legends.push(legend);
        });

        return legends;
    }

    private checkVectorLayer(layer): boolean {
        let isValid = false;
        if (layer.type === LayerType.VectorTile) {
            if (layer.subtype === VectorTileType.Circle) {
                isValid = true;
            } else if (layer.subtype === VectorTileType.Line) {
                isValid = true;
            } else if (layer.subtype === VectorTileType.Fill) {
                isValid = true;
            }
        } else if (
            layer.type === 'circle' || layer.type === 'line' || layer.type === 'fill'
        ) {
            isValid = true;
        } else if ( layer.type === LayerType.GeoJSON ) {
            isValid = true;
        }
        return isValid;
    }

    private getLegendItemByMap(layer) {
        const legenditem = new LegendItem();
        let base64;
        const paint = layer.paint;
        const layout = layer.layout;
        if (layer.type === 'circle') {
            let point:any = {};
            if (layer.paint) {
                point.r = paint["circle-radius"];
                point.stroke = paint["circle-stroke-color"];
                point.strokeWidth = paint["circle-stroke-width"];
                base64 = legenditem.drawPoint(point);
            }
        } else if (layer.type === 'line') {
            let line:any = {};
            if (layer.paint) {
                line.strokeWidth = paint["line-width"];
                line.stroke = paint["line-color"];
            }
            if (layout) {
                line.strokeLineJoin = layout["line-cap"];
            }
            if (Object.keys(line).length > 0) {
                base64 = legenditem.drawLine(line);
            }
        } else if (layer.type === 'fill') {
            let polygon:any = {};
            if (layer.paint) {
                polygon.stroke = paint["fill-outline-color"];
                polygon.fill = paint["fill-color"];
                base64 = legenditem.drawPolygon(polygon);
            }
        }
        legenditem.imageData = base64;
        legenditem.label = layer.id;
        return legenditem;
    }

    private getLegendItemByDocument(layer) {
        const legenditem = new LegendItem();
        let base64;
        const style = layer.style || layer.paint;
        const layout = layer.layout;
        if (layer.type === LayerType.VectorTile || layer.type === LayerType.GeoJSON) {
            if (layer.subtype === VectorTileType.Circle) {
                let point: any = {};
                if (style) {
                    if (style["circle-radius"]) {
                        point.r = style["circle-radius"];
                    }
                    if (style["circle-stroke-color"]) {
                        point.stroke = style["circle-stroke-color"];
                    }
                    if (style["circle-stroke-width"]) {
                        point.strokeWidth = style["circle-stroke-width"];
                    }
                    if (style["circle-color"]) {
                        point.fill = style["circle-color"];
                    }
                    base64 = legenditem.drawPoint(point);
                }
            } else if (layer.subtype === VectorTileType.Line) {
                let line: any = {};
                if (style) {
                    if (style["line-width"]) {
                        line.strokeWidth = style["line-width"];
                    }
                    if (style["line-color"]) {
                        line.stroke = style["line-color"];
                    }
                }
                if (layout) {
                    if (layout["line-cap"]) {
                        line.strokeLineJoin = layout["line-cap"];
                    }
                }

                if (style && style["line-pattern"]) {
                    // base64 = this.sprite.getSpriteItem(style["line-pattern"]);
                } else {
                    base64 = legenditem.drawLine(line);
                }
                // if (Object.keys(line).length > 0) {
                //     base64 = legenditem.drawLine(line);
                // }
            } else if (layer.subtype === VectorTileType.Fill) {
                let polygon: any = {};
                if (style) {
                    if (style["fill-outline-color"]) {
                        polygon.stroke = style["fill-outline-color"];
                    }
                    if (style["fill-color"]) {
                        polygon.fill = style["fill-color"];
                    }
                }
                if (style && style["fill-pattern"]) {
                    // base64 = this.sprite.getSpriteItem(style["fill-pattern"]);
                } else {
                    base64 = legenditem.drawPolygon(polygon);
                }
            }
            legenditem.imageData = base64;
            legenditem.label = layer.title;
        }
        return legenditem;
    }
}
