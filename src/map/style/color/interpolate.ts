import * as d3Scale from 'd3-scale';
import * as d3Color from 'd3-color';

import {
    Categorical,
    Diverging,
    SequentialSingleHue, SequentialMultiHue,
    Cyclical,
    CategoricalList,
    DivergingList,
    SequentialSingleHueList, SequentialMultiHueList,
    CyclicalList
} from './colors';

export function interpolateStepsPercent(min, max, steps, interpolate) {
    steps = steps || 255;

    let format = "";
    for (let i = 0; i <= steps; i++) {
        const stemp = (Math.abs(max - min) / steps * i).toFixed(3);
        const color = interpolate(stemp);
        const colorStr = d3Color.color(color).hex().substring(1);
        format += stemp + ":" + colorStr + "ff;";
    }
    format = format.substring(0, format.length - 1);
    return format;
}
