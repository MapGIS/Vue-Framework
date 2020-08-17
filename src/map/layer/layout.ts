export enum LayoutType {
  /**指北针 */
  Compass = "Compass",
  /**比例尺 */
  Scale = "Scale",
  /**图例 */
  Legend = "Legend",
  /**网格 */
  Grid = "Grid",
  /**主标题 */
  Title = "Title",
  /**副标题 */
  SubTitle = "SubTitle",
}

export enum LayoutLegendType {
  /** 专题图图例 */
  Theme = "Theme",
  /** 图层图例 */
  Layer = "Layer",
  /**图里版图例 */
  Sprite = "Sprite",
  /**自定义图例 */
  Custom = "Custom",
}

export let LayoutLegendDefine = {
  /** 专题图图例 */
  Theme: {
    name: "专题图图例",
    type: LayoutLegendType.Theme,
    info: "根据各类专题图信息，自动生成图例",
    infos: ["根据各类专题图信息", "自动生成图例"],
  },
  Layer: {
    name: "图层图例",
    type: LayoutLegendType.Layer,
    info:
      "以图幅的数据文件为基础，查询并统计图幅所包含的要素种类，并按特定的顺序排序，形成图例内容",
    infos: [
      "以图幅的数据文件为基础",
      "查询并统计图幅所包含的要素种类",
      "并按特定的顺序排序",
      "自动形成图例内容",
    ],
  },
  Sprite: {
    name: "图例版图例",
    type: LayoutLegendType.Sprite,
    info: "以图例版种图例项为基础，允许用户根据需要从中选取某些图例，形成图例",
    infos: [
      "以图例版种图例项为基础",
      "允许用户根据需要从中选取某些图例",
      "自动形成图例",
    ],
  },
  Custom: {
    name: "自定义图例",
    type: LayoutLegendType.Custom,
    info: "以GeoJson格式的矢量要素为基准，自定义图例",
    infos: ["以GeoJson格式的矢量要素为基准", "手动自定义图例"],
  },
};
