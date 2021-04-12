import { IDocument } from '../document';
import { GroupLayer } from '../layer/grouplayer';
import { ThirdLayers } from './guotu';
import { Convert } from '../layer/convert';

export class Template {

}

export interface TemplateImpl {
    apply: (doc: IDocument, layerid: string) => IDocument
}


export class SecondDiao extends Template implements TemplateImpl {
    constructor() {
        super();
    }

    apply(doc: IDocument, layerid: string): IDocument {
        return doc;
    }

}

export class ThirdDiao extends Template implements TemplateImpl {
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
