import * as d3color from 'd3-color'
import * as d3interpolate from 'd3-interpolate'

import { IDocument, MapRender, defaultName, defaultCurrent, defaultBacks } from '../document'
import { defaultSources, Source } from '../source/source'
import { LayerType } from '../layer'
import { VectorTileType, VectorTileLayerDefine } from './baselayer'
import { deepCopy } from '../../utils/deepequal'

export const defaultId = 'cesium vector tiles'
export const defaultSprite = 'http://localhost:6163/igs/rest/mrms/vtiles/sprite'
export const defaultGlyphs = 'http://localhost:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf'
const GeometryTypes = ['circle', 'line', 'fill', 'fill-extrusion', 'symbol'];
const colorProperties = ['fill-color', 'fill-extrusion-color', 'line-color', 'circle-color', 'text-color', 'text-halo-color']

export class Convert {

    /**
 * MapGIS格式的样式文档转换成MapboxGL的样式文档
 * @param doc 
 */
    docTomvt(doc: IDocument) {
        let style = {
            version: 8,
            id: defaultId,
            name: defaultId,
            sources: {},
            layers: [],
            sprite: defaultSprite,
            glyphs: defaultGlyphs,
        }
        if (!doc) {
            return style
        } else {
            style.name = doc.name || defaultId
            style.id = doc.name || defaultId
            style.sprite = doc.sprite || defaultSprite
            style.glyphs = doc.glyphs || defaultGlyphs
            style.sources = this.docTomvtSources(doc)
            style.layers = this.docTomvtLayers(doc)
        }
        return style
    }

    docTomvtSources(doc: IDocument) {
        let sources = {}
        if (!doc) return sources

        for (let key in doc.sources) {
            let source = doc.sources[key]
            if (!source) continue

            let { url, type, min, max } = source

            let newSouce = {
                type: '',
                tiles: [],
                minZoom: 0,
                maxZoom: 24
            }

            if (type == LayerType.VectorTile) {
                newSouce.type = 'vector'
                newSouce.tiles = [url]
                newSouce.minZoom = min
                newSouce.maxZoom = max
                sources[key] = newSouce
            }
        }

        return sources
    }

    docTomvtLayers(doc: IDocument) {
        let layers = []
        if (!doc) return layers

        let flats = doc.getFlatLayers()
        layers = flats.map(layer => {
            let { sourceLayer, subtype, layout, style } = layer
            layer['source-layer'] = sourceLayer
            layer['type'] = this.docTomvtType(subtype)
            layer['layout'] = this.docTomvtLayout(layout)
            layer['paint'] = style || {}
            delete layer.style
            delete layer.subtype
            delete layer.icon
            delete layer.sourceLayer
            delete layer.title
            delete layer.name
            delete layer.url
            return layer
        })

        return layers
    }

    docTomvtType(subtype) {
        return VectorTileLayerDefine[subtype].type

    }

    docTomvtLayout(layout) {
        if (!layout) layout = { visibility: 'visible' }
        if (layout.visible == undefined) {
            layout['visibility'] = 'visible'
        } else if (layout.visible) {
            layout['visibility'] = 'visible'
        } else {
            layout['visibility'] = 'none'
        }
        delete layout.visible
        return layout
    }

    /**
     * MapboxGL的样式文档转换成MapGIS的样式文档
     * @param doc
     */
    mvtTodoc(mvt): IDocument {
        let name = mvt.name || "地图样式";
        let sources = this.mvtTodocSources(mvt.sources);
        let layers = this.mvtTodocLayers(mvt.layers);

        let doc = new IDocument(
            defaultName,
            defaultCurrent,
            defaultBacks,
            layers,
            sources,
            MapRender.MapBoxGL
        );

        return doc;
    }

    mvtTodocSources(sources) {
        if (!sources) return defaultSources;
        let keys = Object.keys(sources);
        let key = "";
        let news = {};
        for (let index = 0; index < keys.length; index++) {
            key = keys[index];
            let source = sources[key];
            if (source.type != 'vector') {
                continue;
            } else {
                let tiles = source.tiles
                if (!tiles) continue;
                if (tiles.length <= 0) continue;
                let url = tiles[0];
                source.name = key;
                source.url = url;
                source.type = LayerType.VectorTile;
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



    mvtTodocLayers(layers) {
        let flats = []
        flats = layers.filter(layer => {
            let { id, type, paint, layout } = layer

            layer['sourceLayer'] = layer['source-layer']

            layer['title'] = id
            layer['id'] = id
            layer['name'] = id
            layer['key'] = id

            if (GeometryTypes.indexOf(layer['type']) < 0) return false

            layer['type'] = LayerType.VectorTile
            layer['subtype'] = this.mvtTodocType(type)
            layer['icon'] = VectorTileLayerDefine[layer.subtype].icon

            layer['info'] = ""
            layer['description'] = ""

            layer['style'] = paint || {}
            layer['layout'] = this.mvtTodocLayout(layout) || {}

            layer['url'] = undefined;

            delete layer.paint
            // delete layer['source-layer']
            // return layer
            return true;
        })
        console.log('flats', flats)
        return flats;
    }

    mvtTodocType(type) {
        let keys = Object.keys(VectorTileLayerDefine)
        let types = keys.map(key => { return VectorTileLayerDefine[key].type });
        let index = types.indexOf(type)
        if (index >= 0) return keys[index]
        return undefined;

    }

    mvtTodocLayout(layout) {
        if (!layout) layout = { visible: true }
        if (layout.visibility == undefined) {
            layout['visible'] = true
        } else if (layout.visibility === 'visible') {
            layout['visible'] = true
        } else {
            layout['visible'] = false
        }
        delete layout.visibility
        return layout
    }

    /**
     * 样式高亮功能实现，主要是实现选中的样式高亮对比度，未选中的样式低对比度
     */
    convertInspectLayers(layers, inspectId) {
        // '#424242'  #181818  #222222
        // let lineColor = d3.interpolateGreys;
        let select = undefined
        layers = layers.filter(layer => {
            if (layer.id == inspectId) select = layer;
            return layer.id != inspectId
        })
        let fills = layers.filter(layer => {
            return layer.type == 'fill' || layer.type == 'fill-extrusion'
        })
        let lines = layers.filter(layer => {
            return layer.type == 'line'
        })
        let circles = layers.filter(layer => {
            return layer.type == 'circle'
        })
        let symbols = layers.filter(layer => {
            return layer.type == 'symbol'
        })

        let unselectFill = this.convertUnselectLayer(fills, 0.8, 1.0)
        let unselectLine = this.convertUnselectLayer(lines, 0.7, 0.9)
        let unselectCircle = this.convertUnselectLayer(circles, 0.2, 0.4)
        let unselectSymbol = this.convertUnselectLayer(symbols, 0.6, 0.8)

        select = this.convertSelectlayer(select)
        return [].concat(unselectFill).concat(unselectLine).concat(unselectCircle).concat(unselectSymbol).concat(select)
    }

    convertUnselectLayer(layers, startPercent, endPercent) {
        let count = layers.length
        let inspects = layers.map((layer, index) => {
            let percent = startPercent + (index / count) * (endPercent - startPercent)
            let color = d3color(d3interpolate.interpolateGreys(percent)).copy({ opacity: 0.5 }).toString()
            if (layer.paint) {
                if (layer.paint['circle-color']) {
                    layer.paint['circle-color'] = color
                } else if (layer.paint['line-color']) {
                    layer.paint['line-color'] = color
                }
                else if (layer.paint['fill-color']) {
                    // #6a6a6a #5b5b5b  #3b3b3b #181818
                    layer.paint['fill-color'] = color
                }
                else if (layer.paint['fill-extrusion-color']) {
                    layer.paint['fill-extrusion-color'] = color
                }
                else if (layer.paint['text-color']) {
                    layer.paint['text-color'] = color
                }
                else if (layer.paint['text-halo-color']) {
                    layer.paint['text-halo-color'] = color
                }
                if (layer.paint['line-pattern']) {
                    layer.paint['line-opacity'] = 0.1
                } else if (layer.paint['fill-pattern']) {
                    layer.paint['fill-opacity'] = 0.1
                } else if (layer.paint['fill-extrusion-pattern']) {
                    layer.paint['fill-extrusion-opacity'] = 0.1
                }
            }
            if (layer.layout) {
                if (layer.layout['icon-image']) {
                    layer.paint['icon-opacity'] = 0.2
                    layer.paint['text-opacity'] = 0.2
                }
            }
            return layer
        })
        return inspects
    }

    convertSelectlayer(layer) {
        if (!layer) layer = {
            filter: ['all'],
            paint: {}
        }
        let unFilter = deepCopy(layer)

        if (layer.filter) {
            unFilter.id = layer.id + '_unfilter'
            if (unFilter.filter[0] == 'all') {
                unFilter.filter[0] = 'none'
            } else if (unFilter.filter[0] == 'none') {
                unFilter.filter[0] = 'any'
            }
            if (unFilter.paint['circle-color']) {
                unFilter.paint['circle-color'] = 'rgba(238, 78, 139, 0.7)'
            } else if (unFilter.paint['line-color']) {
                unFilter.paint['line-color'] = 'rgba(238, 78, 139, 0.7)'
            }
            else if (unFilter.paint['fill-color']) {
                // #6a6a6a #5b5b5b  #3b3b3b #181818
                unFilter.paint['fill-color'] = 'rgba(238, 78, 139, 0.7)'
            }
            else if (unFilter.paint['fill-extrusion-color']) {
                unFilter.paint['fill-extrusion-color'] = 'rgba(238, 78, 139, 0.7)'
            }
            else if (unFilter.paint['text-color']) {
                unFilter.paint['text-color'] = 'rgba(238, 78, 139, 0.7)'
            }
            else if (unFilter.paint['text-halo-color']) {
                unFilter.paint['text-halo-color'] = 'rgba(238, 78, 139, 0.7)'
            }
        }

        if (layer.paint) {
            if (layer.paint['circle-color']) {
                layer.paint['circle-color'] = 'rgba(91, 255, 142, 0.7)'
            } else if (layer.paint['line-color']) {
                layer.paint['line-color'] = 'rgba(91, 255, 142, 0.7)'
            }
            else if (layer.paint['fill-color']) {
                // #6a6a6a #5b5b5b  #3b3b3b #181818
                layer.paint['fill-color'] = 'rgba(91, 255, 142, 0.7)'
            }
            else if (layer.paint['fill-extrusion-color']) {
                layer.paint['fill-extrusion-color'] = 'rgba(91, 255, 142, 0.7)'
            }
            else if (layer.paint['text-color']) {
                layer.paint['text-color'] = 'rgba(91, 255, 142, 0.7)'
            }
            else if (layer.paint['text-halo-color']) {
                layer.paint['text-halo-color'] = 'rgba(91, 255, 142, 0.7)'
            }
        } else {

        }

        layer = [layer]
        unFilter = [unFilter]
        return [].concat(layer).concat(unFilter)
    }

    convertInspectMode(doc: IDocument) {
        let origins = this.docTomvtLayers(doc)
        let inpsectid = doc.getCurrent().id
        let inspects = this.convertInspectLayers(origins, inpsectid);
        return inspects;
    }
}
