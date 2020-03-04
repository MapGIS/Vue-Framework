/* import { NameSpaceDocument } from "../model";
import { ILayout } from '@/map/layer';
import { BackColorLayer } from '@/map/layer/backcolor';

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