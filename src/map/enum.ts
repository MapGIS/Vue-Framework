enum ViewState {
  Map = "map",
  Edit = "edit",
  Query = "query",
  Print = "print",
}

/**
 * @see https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/API.md
 */
enum EditState {
  SIMPLE = "simple_select",
  DIRECT = "direct_select",
  /**画点模式 */
  POINT = "draw_point",
  /**画线模式 */
  LINE_STRING = "draw_line_string",
  /**画区模式 */
  POLYGON = "draw_polygon",
  /**仿照上面DRAW_POINT的模式，实际上是 画点模式 */
  TEXT = "draw_text",
  /** 仿照上面DRAW_POLYGON的模式，实际上是调用map.trash()方法 */
  TRASH = "draw_trash",
}

enum HighLight {
  Single = "single",
  Multi = "multi",
  None = "none",
}

enum LayerType {
  GroupLayer = "GroupLayer",
  BackGround = "BackGround",
  BackColor = "BackColor",
  RasterTile = "RasterTile",
  VectorTile = "VectorTile",
  DemWMS = "DemWMS",
  GeoJSON = "GeoJSON",
  ShapeFile = "ShapeFile",
  UnKnow = "UnKnow",
}

export { ViewState, EditState, HighLight, LayerType };

export default {
  ViewState,
  EditState,
  HighLight,
  LayerType,
};
