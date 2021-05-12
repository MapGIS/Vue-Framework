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
 * @description Mapbox需要的颜色模板
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
