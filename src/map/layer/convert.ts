import { color as d3color } from "d3-color";
import * as d3interpolate from "d3-scale-chromatic";
// const d3color = color;
import {
    IDocument,
    MapRender,
    defaultName,
    defaultCurrent,
    defaultBacks,
} from "../document";
import { defaultSources, Source } from "../source/source";
import { ILayer, LayerType, SubLayerType, SubLayerDefine } from "../layer";
import { GroupLayer, flatLayers } from './grouplayer';
import { VectorTileLayerDefine } from "../vectortile/baselayer";
import { deepCopy } from "../../utils/deepequal";
import { uuid } from "../../utils/uuid";
import { EmptyGeoJSONFeatureCollection } from '../format/geojson';

export const defaultId = "cesium vector tiles";
export const defaultSprite =
    "http://localhost:6163/igs/rest/mrms/vtiles/sprite";
export const defaultGlyphs =
    "http://localhost:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf";
const GeometryTypes = ["circle", "line", "fill", "fill-extrusion", "symbol"];
const colorProperties = [
    "fill-color",
    "fill-extrusion-color",
    "line-color",
    "circle-color",
    "text-color",
    "text-halo-color",
];

export class Convert {
    /**
     * MapGIS格式的样式文档转换成MapboxGL的样式文档
     * @param doc
     */
    docTomvt(doc: IDocument) {
        const style = {
            version: 8,
            id: defaultId,
            name: defaultId,
            sources: {},
            layers: [],
            sprite: defaultSprite,
            glyphs: defaultGlyphs,
        };
        if (!doc) {
            return style;
        } else {
            style.name = doc.name || defaultId;
            style.id = doc.name || defaultId;
            style.sprite = doc.sprite || defaultSprite;
            style.glyphs = doc.glyphs || defaultGlyphs;
            style.sources = this.docTomvtSources(doc);
            style.layers = this.docTomvtLayers(doc);
        }
        return style;
    }

    docTomvtSources(doc: IDocument) {
        const sources = {};
        if (!doc) {
            return sources;
        }

        for (const key of Object.keys(doc.sources)) {
            const source = doc.sources[key];
            if (!source) {
                continue;
            }

            const { url, type, min, max } = source;

            const newSouce = {
                type: "",
                tiles: [],
                path: '',
                minZoom: 0,
                maxZoom: 24,
            };

            if (type === LayerType.VectorTile) {
                newSouce.type = "vector";
                newSouce.tiles = [url];
                newSouce.minZoom = min || 0;
                newSouce.maxZoom = max || 24;
                sources[key] = newSouce;
                delete newSouce.path;
            } else if (type === LayerType.MBTiles) {
                newSouce.type = "mbtiles";
                newSouce.path = url;
                newSouce.minZoom = min || 0;
                newSouce.maxZoom = max || 24;
                sources[key] = newSouce;
                delete newSouce.tiles;
            }
        }

        const flats = doc.getFlatLayers();
        flats.forEach((layer) => {
            const { type, url, key } = layer;
            if (type === LayerType.GeoJSON) {
                sources[key] = {
                    type: 'geojson',
                    data: url || EmptyGeoJSONFeatureCollection
                };
            }
        });

        return sources;
    }

    docTomvtLayers(doc: IDocument, remove: boolean = true) {
        let layers = [];
        if (!doc) {
            return layers;
        }

        const flats = doc.getFlatLayers();
        layers = flats.map((layer) => {
            const { key, sourceLayer, type, subtype, layout, style, paint, children, url } = layer;

            layer.type = this.docTomvtType(subtype);
            layer.subtype = this.docTomvtSubtype(subtype);
            layer.layout = this.docTomvtLayout(layout);
            layer.paint = style || paint || {};

            if (type === VectorTileLayerDefine.Raster.type) {
                layer["source-layer"] = "null";
            } else if (type === LayerType.GeoJSON) {
                // do not has source-layer props
                layer.source = key;
            } else {
                layer["source-layer"] = sourceLayer || "null";
            }

            if (
                subtype === SubLayerType.IgsDocLayer ||
                subtype === SubLayerType.OgcWmsLayer
            ) {
                layer.children = children;
            }

            if (remove) {
                delete layer.style;
                delete layer.subtype;
                delete layer.icon;
                delete layer.sourceLayer;
                delete layer.title;
                delete layer.name;
                // delete layer.url;
                // 这个地方是为了解决实时出后台矢量瓦片导致的tolerance&filter的变化，请看MapboxGL-React/VectorTile
                // let changeUrl = layer.url != vectortile.url ? true : false;
            }

            // layer.key = uuid();
            return layer;
        });

        return layers;
    }

    docGroupTomvtLayers(group: GroupLayer, remove: boolean = true) {
        const flats: any[] = flatLayers(group, true);

        const layers = flats.map((layer) => {
            const { key, sourceLayer, type, subtype, layout, style, paint, children, url } = layer;

            layer.type = this.docTomvtType(subtype);
            layer.subtype = this.docTomvtSubtype(subtype);
            layer.layout = this.docTomvtLayout(layout);
            layer.paint = style || paint || {};

            if (type === VectorTileLayerDefine.Raster.type) {
                layer["source-layer"] = "null";
            } else if (type === LayerType.GeoJSON) {
                // do not has source-layer props
                layer.source = key;
            } else {
                layer["source-layer"] = sourceLayer || "null";
            }

            if (
                subtype === SubLayerType.IgsDocLayer ||
                subtype === SubLayerType.OgcWmsLayer
            ) {
                layer.children = children;
            }

            if (remove) {
                delete layer.style;
                delete layer.subtype;
                delete layer.icon;
                delete layer.sourceLayer;
                delete layer.title;
                delete layer.name;
                // delete layer.url;
                // 这个地方是为了解决实时出后台矢量瓦片导致的tolerance&filter的变化，请看MapboxGL-React/VectorTile
                // let changeUrl = layer.url != vectortile.url ? true : false;
            }

            // layer.key = uuid();
            return layer;
        });

        return layers;
    }


    docTomvtType(subtype) {
        let type = subtype;
        if (SubLayerDefine[subtype] && SubLayerDefine[subtype].type) {
            type = SubLayerDefine[subtype].type;
        } else if (
            VectorTileLayerDefine[subtype] &&
            VectorTileLayerDefine[subtype].type
        ) {
            type = VectorTileLayerDefine[subtype].type;
        }
        return type;
    }

    docTomvtSubtype(subtype) {
        let type = subtype;
        if (SubLayerDefine[subtype] && SubLayerDefine[subtype].type) {
            type = SubLayerDefine[subtype].subtype;
        } else if (
            VectorTileLayerDefine[subtype] &&
            VectorTileLayerDefine[subtype].type
        ) {
            type = VectorTileLayerDefine[subtype].subtype;
        }
        return type;
    }

    docTomvtLayout(layout) {
        if (!layout) {
            layout = { visibility: "visible" };
        }
        if (layout.visible === undefined) {
            layout.visibility = "visible";
        } else if (layout.visible) {
            layout.visibility = "visible";
        } else {
            layout.visibility = "none";
        }
        delete layout.visible;
        return layout;
    }

    /**
     * MapboxGL的样式文档转换成MapGIS的样式文档
     * @param doc
     */
    mvtTodoc(mvt): IDocument {
        const name = mvt.name || "地图样式";
        const sources = this.mvtTodocSources(mvt);
        const layers = this.mvtTodocLayers(mvt);

        const doc = new IDocument(
            defaultName,
            defaultCurrent,
            defaultBacks,
            layers,
            sources,
            MapRender.MapBoxGL
        );

        doc.sprite = mvt.sprite;
        doc.glyphs = mvt.glyphs;

        return doc;
    }

    mvtTodocSources(mvt) {
        let { sources } = mvt;
        if (!sources) {
            return defaultSources;
        }
        const keys = Object.keys(sources);
        let news = {};
        for (const key of keys) {
            const source = sources[key];
            if (source.type == "vector" || source.type == 'raster') {
                const tiles = source.tiles;
                if (!tiles) { continue; }
                if (tiles.length <= 0) { continue; }
                const url = tiles[0];
                source.name = key;
                source.url = url;
                if (source.type === 'raster') {
                    source.type = LayerType.RasterTile;
                } else if (source.type === 'vector') {
                    source.type = LayerType.VectorTile;
                }
                source.minZoom = source.min || 0;
                source.maxZoom = source.max || 20;
                delete source.tiles;
                delete source.min;
                delete source.max;
                news = Source.addSource(news, source, key);
            }
        }
        return news || defaultSources;
    }

    mvtTodocLayers(mvt) {
        let { layers } = mvt;
        let flats = [];
        flats = layers.filter((layer) => {
            const { id, type, paint, layout, minzoom, maxzoom } = layer;
            layer.title = id;
            layer.id = id;
            layer.name = id;
            layer.key = id;
            layer.info = "";
            layer.description = "";
            layer.style = paint || {};
            layer.layout = this.mvtTodocLayout(layout) || {};
            layer.url = undefined;
            layer.minZoom = minzoom;
            layer.maxZoom = maxzoom;
            delete layer.paint;
            delete layer.minzoom;
            delete layer.maxzoom;

            if (type == "raster") {
                layer.type = LayerType.RasterTile;
                layer.subtype = this.mvtTodocType(type);
                layer.icon = VectorTileLayerDefine[layer.subtype].icon;
                let url = mvt.sources[layer.source].url;
                layer.url = url;
            } else {
                layer.sourceLayer = layer["source-layer"];

                if (GeometryTypes.indexOf(layer.type) < 0) { return false; }

                layer.type = LayerType.VectorTile;
                layer.subtype = this.mvtTodocType(type);
                layer.icon = VectorTileLayerDefine[layer.subtype].icon;
                // delete layer['source-layer']
                // return layer
            }
            return true;
        });
        return flats;
    }

    mvtTodocType(type) {
        const keys = Object.keys(VectorTileLayerDefine);
        const types = keys.map((key) => {
            return VectorTileLayerDefine[key].type;
        });
        const index = types.indexOf(type);
        if (index >= 0) { return keys[index]; }
        return undefined;
    }

    mvtTodocLayout(layout) {
        if (!layout) { layout = { visible: true }; }
        if (layout.visibility === undefined) {
            layout.visible = true;
        } else if (layout.visibility === "visible") {
            layout.visible = true;
        } else {
            layout.visible = false;
        }
        delete layout.visibility;
        return layout;
    }

    /**
     * 样式高亮功能实现，主要是实现选中的样式高亮对比度，未选中的样式低对比度
     */
    convertInspectLayers(layers, inspectId) {
        // '#424242'  #181818  #222222
        // let lineColor = d3.interpolateGreys;
        let select;
        const unselectLayers = layers.filter((layer) => {
            if (layer.id === inspectId) { select = layer; }
            return layer.id !== inspectId;
        });
        const fills = unselectLayers.filter((layer) => {
            return layer.type === "fill" || layer.type === "fill-extrusion";
        });
        const lines = unselectLayers.filter((layer) => {
            return layer.type === "line";
        });
        const circles = unselectLayers.filter((layer) => {
            return layer.type === "circle";
        });
        const symbols = unselectLayers.filter((layer) => {
            return layer.type === "symbol";
        });
        const selects = layers.filter((layer) => {
            return layer.id === inspectId;
        });
        if (selects.length > 0) {
            select = selects[0];
        }

        const unselectFill = this.convertUnselectLayer(fills, 0.8, 1.0);
        const unselectLine = this.convertUnselectLayer(lines, 0.7, 0.9);
        const unselectCircle = this.convertUnselectLayer(circles, 0.2, 0.4);
        const unselectSymbol = this.convertUnselectLayer(symbols, 0.6, 0.8);

        select = this.convertSelectlayer(select);
        return []
            .concat(unselectFill)
            .concat(unselectLine)
            .concat(unselectCircle)
            .concat(unselectSymbol)
            .concat(select);
    }

    convertUnselectLayer(layers, startPercent, endPercent) {
        const count = layers.length;
        const inspects = layers.map((layer, index) => {
            const percent =
                startPercent + (index / count) * (endPercent - startPercent);
            const color = d3color(d3interpolate.interpolateGreys(percent))
                .copy({ opacity: 0.5 })
                .toString();
            if (layer.paint) {
                if (layer.paint["circle-color"]) {
                    layer.paint["circle-color"] = color;
                } else if (layer.paint["line-color"]) {
                    layer.paint["line-color"] = color;
                } else if (layer.paint["fill-color"]) {
                    // #6a6a6a #5b5b5b  #3b3b3b #181818
                    layer.paint["fill-color"] = color;
                } else if (layer.paint["fill-extrusion-color"]) {
                    layer.paint["fill-extrusion-color"] = color;
                } else if (layer.paint["text-color"]) {
                    layer.paint["text-color"] = color;
                } else if (layer.paint["text-halo-color"]) {
                    layer.paint["text-halo-color"] = color;
                }
                if (layer.paint["line-pattern"]) {
                    layer.paint["line-opacity"] = 0.1;
                } else if (layer.paint["fill-pattern"]) {
                    layer.paint["fill-opacity"] = 0.1;
                } else if (layer.paint["fill-extrusion-pattern"]) {
                    layer.paint["fill-extrusion-opacity"] = 0.1;
                }
            }
            if (layer.layout) {
                if (layer.layout["icon-image"]) {
                    layer.paint["icon-opacity"] = 0.2;
                    layer.paint["text-opacity"] = 0.2;
                }
            }
            return layer;
        });
        return inspects;
    }

    convertSelectlayer(layer) {
        if (!layer) {
            layer = {
                filter: ["all"],
                paint: {},
            };
        }

        let unFilter = deepCopy(layer);

        if (layer.filter) {
            unFilter.id = layer.id + "_unfilter";
            if (unFilter.filter[0] === "all") {
                unFilter.filter[0] = "none";
            } else if (unFilter.filter[0] === "none") {
                unFilter.filter[0] = "any";
            }
            if (unFilter.paint["circle-color"]) {
                unFilter.paint["circle-color"] = "rgba(238, 78, 139, 0.7)";
            } else if (unFilter.paint["line-color"]) {
                unFilter.paint["line-color"] = "rgba(238, 78, 139, 0.7)";
            } else if (unFilter.paint["fill-color"]) {
                // #6a6a6a #5b5b5b  #3b3b3b #181818
                unFilter.paint["fill-color"] = "rgba(238, 78, 139, 0.7)";
            } else if (unFilter.paint["fill-extrusion-color"]) {
                unFilter.paint["fill-extrusion-color"] = "rgba(238, 78, 139, 0.7)";
            } else if (unFilter.paint["text-color"]) {
                unFilter.paint["text-color"] = "rgba(238, 78, 139, 0.7)";
            } else if (unFilter.paint["text-halo-color"]) {
                unFilter.paint["text-halo-color"] = "rgba(238, 78, 139, 0.7)";
            }
        }

        if (layer.paint) {
            if (layer.paint["circle-color"]) {
                layer.paint["circle-color"] = "rgba(91, 255, 142, 0.7)";
            } else if (layer.paint["line-color"]) {
                layer.paint["line-color"] = "rgba(91, 255, 142, 0.7)";
            } else if (layer.paint["fill-color"]) {
                // #6a6a6a #5b5b5b  #3b3b3b #181818
                layer.paint["fill-color"] = "rgba(91, 255, 142, 0.7)";
            } else if (layer.paint["fill-extrusion-color"]) {
                layer.paint["fill-extrusion-color"] = "rgba(91, 255, 142, 0.7)";
            } else if (layer.paint["text-color"]) {
                layer.paint["text-color"] = "rgba(91, 255, 142, 0.7)";
            } else if (layer.paint["text-halo-color"]) {
                layer.paint["text-halo-color"] = "rgba(91, 255, 142, 0.7)";
            }
        } else {
            // other
        }

        layer = [layer];
        unFilter = [unFilter];
        const selects = layer[0].filter ? [].concat(layer).concat(unFilter) : layer;
        return selects;
    }

    convertInspectMode(doc: IDocument) {
        const origins = this.docTomvtLayers(doc);
        const inpsectid = doc.getCurrent().id;
        const inspects = this.convertInspectLayers(origins, inpsectid);
        return inspects;
    }
}
