import { LayerType, ILayer } from "../layer";
import { GroupLayer } from "../layer/grouplayer";
import { BaseLayer as VectorTileLayer } from "../vectortile/baselayer";

export const defaultRasterLayer: Array<ILayer> = [
  /* {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/世界地图_3857/{z}/{y}/{x}",
    description: "世界地图",
    name: "世界地图",
    title: "世界地图",
    id: "raster-world",
    key: "raster-world",
    icon: "icon-raster_tile",
    bounds: { left: -180, bottom: -90, right: 180, top: 90 }
  }*/
];

export const defaultVectorLayer: Array<VectorTileLayer> = [
/*   {
    "title": "点图层",
    "source": "IGServer",
    "sourceLayer": "circle",
    "minZoom": 0,
    "maxZoom": 24,
    "subtype": "Circle",
    "icon": "icon-vectorcirclevariant",
    "type": LayerType.VectorTile,
    "name": "",
    "url": "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片湖北/{z}/{y}/{x}?type=cpbf&returnError=false",
    "key": "vectortile-circle",
    "id": "vectortile-circle",
    "description": "图层信息",
    "info": "图层信息"
  } */
];

export const defaultGroupLayer: Array<GroupLayer> = [
  {
    type: LayerType.GroupLayer,
    description: "测试组图层-1",
    name: "组图层1",
    title: "组图层1",
    id: "group-default-1",
    key: "group-default-1",
    children: [{
      type: LayerType.GroupLayer,
      description: "测试组图层-1-1",
      name: "组图层1-1",
      title: "组图层1-1",
      id: "group-default-1-1",
      key: "group-default-1-1",
      children: defaultRasterLayer
    }]
  },
  {
    type: LayerType.GroupLayer,
    description: "测试组图层-2",
    name: "矢量瓦片组图层",
    title: "矢量瓦片组图层",
    id: "group-default-2",
    key: "group-default-2",
    children: defaultVectorLayer
  },
  {
    type: LayerType.GroupLayer,
    description: "测试组图层-3",
    name: "组图层3",
    title: "组图层3",
    id: "group-default-3",
    key: "group-default-3",
    children: []
  }
];
