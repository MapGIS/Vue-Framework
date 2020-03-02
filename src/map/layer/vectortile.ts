import { ILayer, LayerType, IStyle, ILayout } from "./baselayer";

export class VectorTileLayer extends ILayer {
    title?: string;
    imgUrl?: string;
    layout?: ILayout;
    styleUrl: string;
}

export const DefaultVectorTileLayer: VectorTileLayer = {
    type: LayerType.VectorTile,
    name: "默认标题",
    id: "DefaultVectorTile",
    key: "DefaultVectorTile",
    title: "默认标题",
    styleUrl: ""
}
