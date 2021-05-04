import { IDocument } from '../document';
import { GroupLayer } from '../layer/grouplayer';
import { SecondLayers, ThirdLayers } from './guotu';
import { Convert } from '../layer/convert';
import { LayerType } from '../layer/baselayer';
import { Theme, ThemeAction } from './theme';
import { deepCopy } from '../../utils/deepequal'

export class MapgisStyleTheme extends Theme implements ThemeAction {
    constructor() {
        super();
    }

    apply(doc: IDocument, layerid: string, mst: any[]): IDocument {
        return apply(doc, layerid, mst, '自定义模板');
    }
}

export class SecondDiao extends Theme implements ThemeAction {
    constructor() {
        super();
    }

    apply(doc: IDocument, layerid: string, mst: any[]): IDocument {
        return apply(doc, layerid, SecondLayers, '二调模板')
    }
}

export class ThirdDiao extends Theme implements ThemeAction {
    constructor() {
        super();
    }

    apply(doc: IDocument, layerid: string, mst: any[]): IDocument {
        return apply(doc, layerid, ThirdLayers, '三调模板')
    }
}

function apply(doc: IDocument, layerid: string, mst: any[], title: string): IDocument {
    title = title || "自定义模板";
    const layer = doc.getLayerById(layerid);
    const {url, sourceLayer, type} = layer;
    const sourceKey = title;

    if (!doc.sources[sourceKey]) {
        doc.sources[sourceKey] = {
            name: title,
            type: "DataStore",
            url,
            min: 0,
            max: 24,
            description: title
        }
    }

    const conv = new Convert();
    mst = mst || deepCopy(SecondLayers);
    const layers = conv.mvtTodocLayers({layers: mst});

    const temps = layers.map((l: any) => {
        l.type = type;
        l.sourceLayer = sourceLayer;
        l.source = sourceKey;
        l.minZoom = 0;
        l.maxZoom = 24;
        l.url = url;
        delete l["source-layer"];
        return l;
    });

    const tempgroup = new GroupLayer();
    tempgroup.title = `${title}-组图层`
    tempgroup.children = temps;

    doc.addLayerInGroup(tempgroup);

    return doc;
}
