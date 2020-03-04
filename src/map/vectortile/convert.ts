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
     * @description MapGIS格式的样式文档转换成MapboxGL的样式文档
     * @param doc 地图文档
     */
    docTomvt(doc: IDocument) {
        // tslint:disable-next-line: prefer-const
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
        // tslint:disable-next-line: prefer-const
        let sources = {}
        if (!doc) {
            return sources
        }

        for (const key of Object.keys(doc.sources)) {
            const source = doc.sources[key]
            if (!source) {
                continue
            }

            const { url, type, min, max } = source
            // tslint:disable-next-line: prefer-const
            let newSouce = {
                type: '',
                tiles: [],
                minZoom: 0,
                maxZoom: 24
            }

            if (type === LayerType.VectorTile) {
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
        // tslint:disable-next-line: prefer-const
        let layers = []
        if (!doc) {
            return layers
        }

        const flats = doc.getFlatLayers()
        layers = flats.map((layer) => {
            const { sourceLayer, subtype, layout, style } = layer
            layer.set('source-layer', sourceLayer)
            layer.set('type', this.docTomvtType(subtype))
            layer.set('layout', this.docTomvtLayout(layout))
            layer.set('paint', style || {})
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
        if (!layout) {
            layout = { visibility: 'visible' }
        }
        if (layout.visible === undefined) {
            layout.set('visibility', 'visible')
        } else if (layout.visible) {
            layout.set('visibility', 'visible')
        } else {
            layout.set('visibility', 'none')
        }
        delete layout.visible
        return layout
    }

    /**
 * MapboxGL的样式文档转换成MapGIS的样式文档
 * @param doc
 */
    mvtTodoc(mvt): IDocument {
        // let name = mvt.name || "地图样式";
        const sources = this.mvtTodocSources(mvt.sources);
        const layers = this.mvtTodocLayers(mvt.layers);

        // tslint:disable-next-line: prefer-const
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
        if (!sources) {
            return defaultSources;
        }
        const keys = Object.keys(sources);
        let key;
        // tslint:disable-next-line: prefer-const
        let news = {};
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < keys.length; index++) {
            key = keys[index];
            // tslint:disable-next-line: prefer-const
            let source = sources[key];
            if (source.type !== 'vector') {
                continue;
            } else {
                const tiles = source.tiles
                if (!tiles || tiles.length <= 0) { continue; }
                const url = tiles[0];
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
        flats = layers.filter((layer) => {
            const { id, type, paint, layout } = layer

            layer.set('sourceLayer', layer.get('source-layer'))

            layer.set('title', id)
            layer.set('id', id)
            layer.set('name', id)
            layer.set('key', id)

            if (GeometryTypes.indexOf(layer.get('type')) < 0) {
                return false
            } else {
                layer.set('type', LayerType.VectorTile)
                layer.set('subtype', this.mvtTodocType(type))
                layer.set('icon', VectorTileLayerDefine[layer.subtype].icon)

                layer.set('info', "")
                layer.set('description', "")

                layer.set('style', paint || {})
                layer.set('layout', this.mvtTodocLayout(layout) || {})

                layer.set('url', undefined)

                delete layer.paint
                // delete layer['source-layer']
                // return layer
                return true;
            }
        })
        return flats;
    }

    mvtTodocType(type) {
        const keys = Object.keys(VectorTileLayerDefine)
        const types = keys.map((key) => VectorTileLayerDefine[key].type);
        const index = types.indexOf(type)
        if (index >= 0) {
            return keys[index]
        }
        return undefined;

    }

    mvtTodocLayout(layout) {
        if (!layout) {
            layout = { visible: true }
        }
        if (layout.visibility === undefined) {
            layout.set('visible', true)
        } else if (layout.visibility === 'visible') {
            layout.set('visible', true)
        } else {
            layout.set('visible', false)
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
        let select
        layers = layers.filter((layer) => {
            if (layer.id === inspectId) {
                select = layer;
            }
            return layer.id !== inspectId
        })
        const fills = layers.filter((layer) => {
            return layer.type === 'fill' || layer.type === 'fill-extrusion'
        })
        const lines = layers.filter((layer) => {
            return layer.type === 'line'
        })
        const circles = layers.filter((layer) => {
            return layer.type === 'circle'
        })
        const symbols = layers.filter((layer) => {
            return layer.type === 'symbol'
        })

        const unselectFill = this.convertUnselectLayer(fills, 0.8, 1.0)
        const unselectLine = this.convertUnselectLayer(lines, 0.7, 0.9)
        const unselectCircle = this.convertUnselectLayer(circles, 0.2, 0.4)
        const unselectSymbol = this.convertUnselectLayer(symbols, 0.6, 0.8)

        select = this.convertSelectlayer(select)
        return [].concat(unselectFill).concat(unselectLine).concat(unselectCircle).concat(unselectSymbol).concat(select)
    }

    convertUnselectLayer(layers, startPercent, endPercent) {
        const count = layers.length
        // tslint:disable-next-line: prefer-const
        let inspects = layers.map((layer, index) => {
            const percent = startPercent + (index / count) * (endPercent - startPercent)
            const color = d3color(d3interpolate.interpolateGreys(percent)).copy({ opacity: 0.5 }).toString()
            if (layer.paint) {
                if (layer.paint.get('circle-color')) {
                    layer.paint.set('circle-color', color)
                } else if (layer.get('line-color')) {
                    layer.paint.set('line-color', color)
                } else if (layer.paint.get('fill-color')) {
                    layer.paint.set('fill-color', color)
                } else if (layer.paint.get('fill-extrusion-color')) {
                    layer.paint.set('fill-extrusion-color', color)
                } else if (layer.paint.get('text-color')) {
                    layer.paint.set('text-color', color)
                } else if (layer.paint.get('text-halo-color')) {
                    layer.paint.set('text-halo-color', color)
                } else {
                    // do nothing
                }
                if (layer.paint.get('line-pattern')) {
                    layer.paint.set('line-opacity', 0.1)
                } else if (layer.paint.get('fill-pattern')) {
                    layer.paint.set('fill-opacity', 0.1)
                } else if (layer.paint.get('fill-extrusion-pattern')) {
                    layer.paint.set('fill-extrusion-opacity', 0.1)
                } else {
                    // do nothing
                }
            }
            if (layer.layout) {
                if (layer.layout.get('icon-image')) {
                    layer.paint.set('icon-opacity', 0.2)
                    layer.paint.set('text-opacity', 0.2)
                }
            }
            return layer
        })
        return inspects
    }

    convertSelectlayer(layer) {
        if (!layer) {
            layer = {
                filter: ['all'],
                paint: {}
            }
        }
        let unFilter = deepCopy(layer)

        if (layer.filter) {
            unFilter.id = layer.id + '_unfilter'
            if (unFilter.filter[0] === 'all') {
                unFilter.filter[0] = 'none'
            } else if (unFilter.filter[0] === 'none') {
                unFilter.filter[0] = 'any'
            } else {
                // do nothing
            }
            if (unFilter.paint.get('circle-color')) {
                unFilter.paint['circle-color'] = 'rgba(238, 78, 139, 0.7)'
            } else if (unFilter.paint.get('line-color')) {
                unFilter.paint.set('line-color', 'rgba(238, 78, 139, 0.7)')
            } else if (unFilter.paint.get('fill-color')) {
                unFilter.paint.set('fill-color', 'rgba(238, 78, 139, 0.7)')
            } else if (unFilter.paint.get('fill-extrusion-color')) {
                unFilter.paint.set('fill-extrusion-color', 'rgba(238, 78, 139, 0.7)')
            } else if (unFilter.paint.get('text-color')) {
                unFilter.paint.set('text-color', 'rgba(238, 78, 139, 0.7)')
            } else if (unFilter.paint.get('text-halo-color')) {
                unFilter.paint.set('text-halo-color', 'rgba(238, 78, 139, 0.7)')
            } else {
                // do nothing
            }

            if (layer.paint) {
                if (layer.paint.get('circle-color')) {
                    layer.paint.set('circle-color', 'rgba(91, 255, 142, 0.7)')
                } else if (layer.paint.get('line-color')) {
                    layer.paint.set('line-color', 'rgba(91, 255, 142, 0.7)')
                } else if (layer.paint.get('fill-color')) {
                    layer.paint.set('fill-color', 'rgba(91, 255, 142, 0.7)')
                } else if (layer.paint.get('fill-extrusion-color')) {
                    layer.paint.set('fill-extrusion-color', 'rgba(91, 255, 142, 0.7)')
                } else if (layer.paint.get('text-color')) {
                    layer.paint.set('text-color', 'rgba(91, 255, 142, 0.7)')
                } else if (layer.paint.get('text-halo-color')) {
                    layer.paint.set('text-halo-color', 'rgba(91, 255, 142, 0.7)')
                } else {
                    // do nothing
                }
            } else {
                // do nothing
            }

            layer = [layer]
            unFilter = [unFilter]
            return [].concat(layer).concat(unFilter)
        }
    }

    convertInspectMode(doc: IDocument) {
        const origins = this.docTomvtLayers(doc)
        const inpsectid = doc.getCurrent().id
        // tslint:disable-next-line: prefer-const
        let inspects = this.convertInspectLayers(origins, inpsectid);
        return inspects;
    }
}
