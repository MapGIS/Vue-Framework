import * as d3Scale from "d3-scale";
import * as d3Color from "d3-color";

/**
 * @description 颜色插值函数，专门用于遥感数据的颜色表建立
 * @param {Number} [min = 0] 最小值
 * @param {Number} [max = 255] 最大值
 * @param {Number} [steps = 100]  分段数
 * @param {Function} [interpolate] 插值函数，从Color.Interpolates里面获取对应的interpolate，这里不能是scheme
 */
export function interpolateStepsPercent(min, max, steps, interpolate) {
    steps = steps || 255;

    let format = "";
    let stemp;
    let percent;
    let color;
    let colorStr;
    for (let i = 0; i <= steps; i++) {
        stemp = ((Math.abs(max - min) / steps) * i).toFixed(3);
        percent = (i / steps).toFixed(3);
        color = interpolate(percent);
        colorStr = d3Color
            .color(color)
            .hex()
            .substring(1);
        format += stemp + ":" + colorStr + "ff;";
    }
    format = format.substring(0, format.length - 1);
    return format;
}
