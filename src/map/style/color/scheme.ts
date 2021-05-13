import * as d3 from 'd3-scale';

/**
 * @description MapGIS平台遥感需要的颜色模板
 * @param {Number} [min = 0] 最小值
 * @param {Number} [max = 255] 最大值
 * @param scheme d3颜色色卡
 * @returns 
 */
export function schemeStepsPercent(min, max, scheme) {
    const colors = d3.scaleQuantize().domain([min, max]).range(scheme);
    let format = "";
    for (let i = 0; i <= 10; i++) {
        const stemp = (Math.abs(max - min) / 10 * i).toFixed(1);
        format += stemp + ":" + colors(stemp).substring(1) + "ff;";
    }
    format = format.substring(0, format.length - 1);
    return format;
}

/**
 * @description Mapbox需要的颜色模板-针对数值型
 * @param {Number} [min = 0] 最小值
 * @param {Number} [max = 255] 最大值
 * @param scheme d3颜色色卡
 * @returns 
 */
export function schemeStepsStops(min, max, scheme) {
    const colors = d3.scaleQuantize().domain([min, max]).range(scheme);
    let stops = [];
    for (let i = 0; i <= 10; i++) {
        const stemp = Math.ceil(Math.abs(max - min) / 10 * i);
        stops.push([stemp, colors(stemp)]);
    }
    return stops;
}

/**
 * @description Mapbox需要的颜色模板-针对字符串型
 * @param {Array<String>} unique 属性字段统计数组
 * @param scheme d3颜色色卡
 * @returns 
 */
export function schemeMatchStops(unique, scheme) {
    if (!unique || unique.length <= 0) return;
    const min = 0, max = unique.length;
    const count = Math.abs(max - min);
    const colors = d3.scaleQuantize().domain([min, max]).range(scheme);
    let stops = [];
    unique.forEach((f, i) => {
        stops.push(f);
        stops.push(colors(i));
    });
    stops.push(colors(1));
    return stops;
}

export function scaleLinear(domain, scheme) {
    return d3.scaleLinear().domain(domain).range(scheme);
}

export function scaleOrdinal(domain, scheme) {
    return d3.scaleOrdinal().domain(domain).range(scheme);
}

export function scaleQuantize(domain, scheme) {
    return d3.scaleQuantize().domain(domain).range(scheme);
}

export function scaleSequential(domain, scheme) {
    return d3.scaleSequential().domain(domain).range(scheme);
}
