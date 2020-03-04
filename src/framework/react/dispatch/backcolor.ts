/* import { NameSpaceDocument } from "../model";
import { ILayout } from '@/map/layer';
import { BackColorLayer, BackColorStyle } from '@/map/layer/backcolor';

export function changeBackColorStyle(
    BackColors: Array<BackColorLayer>,
    style: BackColorStyle
) {
    if (BackColors.length <= 0) return null;
    BackColors.map(back => {
        back.style = style;
    });

    return {
        type: NameSpaceDocument + "/changeBackColorStyle",
        payload: BackColors
    };
}

export function changeBackColorLayout(
    BackColors: Array<BackColorLayer>,
    layout: ILayout
) {
    if (BackColors.length <= 0) return null;
    BackColors.map(back => {
        back.layout = layout;
    });

    return {
        type: NameSpaceDocument + "/changeBackColorLayout",
        payload: BackColors
    };
}
 */