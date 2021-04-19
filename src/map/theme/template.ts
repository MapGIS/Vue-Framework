import { IDocument } from '../document';
import { GroupLayer } from '../layer/grouplayer';
import { SecondLayers, ThirdLayers } from './guotu';
import { Convert } from '../layer/convert';
import { Theme, ThemeAction } from './theme';

export class SecondDiao extends Theme implements ThemeAction {
    constructor() {
        super();
    }

    apply(doc: IDocument, layerid: string): IDocument {
        const layer = doc.getLayerById(layerid);
        const {url, sourceLayer} = layer;
        const sourceKey =  "二调模板";
        if (!doc.sources[sourceKey]) {
            doc.sources[sourceKey] = {
                name: "默认二调模板",
                type: "DataStore",
                url,
                min: 0,
                max: 24,
                description: "DataStore二调模板."
            }
        }

        const conv = new Convert();
        const layers = conv.mvtTodocLayers({layers: SecondLayers});

        const temps = layers.map((l:any) => {
            l.sourceLayer = sourceLayer;
            l.source = sourceKey;
            return l;
        });

        const tempgroup = new GroupLayer();
        tempgroup.title = "二调模板组图层"
        tempgroup.children = temps;

        doc.addLayerInGroup(tempgroup );
        doc.deleteLayer(layerid);

        return doc;
    }


}

export class ThirdDiao extends Theme implements ThemeAction {
    constructor() {
        super();
    }

    apply(doc: IDocument, layerid: string): IDocument {
        const layer = doc.getLayerById(layerid);
        const {url, sourceLayer} = layer;
        const sourceKey =  "三调模板";
        if (!doc.sources[sourceKey]) {
            doc.sources[sourceKey] = {
                name: "默认三调模板",
                type: "DataStore",
                url,
                min: 0,
                max: 24,
                description: "DataStore三调模板."
            }
        }

        const conv = new Convert();
        const layers = conv.mvtTodocLayers({layers: ThirdLayers});

        const temps = layers.map((l:any) => {
            l.sourceLayer = sourceLayer;
            l.source = sourceKey;
            return l;
        });

        const tempgroup = new GroupLayer();
        tempgroup.title = "三调模板组图层"
        tempgroup.children = temps;

        doc.addLayerInGroup(tempgroup );
        doc.deleteLayer(layerid);

        return doc;
    }

}
