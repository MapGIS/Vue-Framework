import { NameSpaceDocument } from "../model";

import { ILayout } from '@/map/layer';
import { BackGroundLayer, BackGroundStyle } from '@/map/layer/background';

export function changeBackgroundStyle(
    backgrounds: Array<BackGroundLayer>,
    style: BackGroundStyle
) {
    if (backgrounds.length <= 0) return null;
    backgrounds.map(back => {
        back.style = style;
    });

    return {
        type: NameSpaceDocument + "/changeBackgroundStyle",
        payload: backgrounds
    };
}

export function changeBackgroundLayout(
    backgrounds: Array<BackGroundLayer>,
    layout: ILayout
) {
    if (backgrounds.length <= 0) return null;
    backgrounds.map(back => {
        back.layout = layout;
    });

    return {
        type: NameSpaceDocument + "/changeBackgroundLayout",
        payload: backgrounds
    };
}
