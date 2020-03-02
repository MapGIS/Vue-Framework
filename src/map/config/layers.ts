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
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/中国512/{z}/{y}/{x}",
    description: "中国",
    name: "中国",
    title: "中国",
    id: "raster-china",
    key: "raster-china",
    icon: "icon-raster_tile",
    bounds: { left: 57.24, bottom: -2.18, right: 156.74, top: 58.10 }
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/湖北省512/{z}/{y}/{x}",
    description: "湖北省",
    name: "湖北省",
    title: "湖北省",
    id: "raster-hubei",
    key: "raster-hubei",
    icon: "icon-raster_tile",
    bounds: { left: 105.3095, bottom: 27.7175, right: 117.2621, top: 33.8566 }
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/武汉市512/{z}/{y}/{x}",
    description: "武汉市",
    name: "武汉市",
    title: "武汉市",
    id: "raster-wuhan",
    key: "raster-wuhan",
    icon: "icon-raster_tile",
    bounds: { left: 113.702281, bottom: 29.969077, right: 115.082573, top: 31.36126 }
  } */
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
  },
  {
    "title": "线图层",
    "source": "IGServer",
    "sourceLayer": "line",
    "minZoom": 0,
    "maxZoom": 24,
    "subtype": "Line",
    "icon": "icon-vectorpolyline",
    "type": LayerType.VectorTile,
    "url": "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片湖北/{z}/{y}/{x}?type=cpbf&returnError=false",
    "name": "",
    "key": "vectortile-line",
    "id": "vectortile-line",
    "description": "图层信息",
    "info": "图层信息"
  },
  {
    "title": "区图层",
    "source": "IGServer",
    "sourceLayer": "fill",
    "minZoom": 0,
    "maxZoom": 24,
    "subtype": "Fill",
    "icon": "icon-vector-polygon",
    "type": LayerType.VectorTile,
    "url": "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片湖北/{z}/{y}/{x}?type=cpbf&returnError=false",
    "name": "",
    "key": "vectortile-fill",
    "id": "vectortile-fill",
    "description": "图层信息",
    "info": "图层信息"
  },
  {
    "title": "面图层",
    "source": "IGServer",
    "sourceLayer": "fill",
    "minZoom": 0,
    "maxZoom": 24,
    "subtype": "FillExtrusion",
    "icon": "icon-vector-polygon",
    "type": LayerType.VectorTile,
    "url": "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片湖北/{z}/{y}/{x}?type=cpbf&returnError=false",
    "name": "",
    "key": "vectortile-fill-extrusion",
    "id": "vectortile-fill-extrusion",
    "description": "图层信息",
    "info": "图层信息"
  },
  {
    "title": "符号图层",
    "source": "IGServer",
    "sourceLayer": "symbol",
    "minZoom": 0,
    "maxZoom": 24,
    "subtype": "Symbol",
    "icon": "icon-dollar-symbol-1",
    "type": LayerType.VectorTile,
    "url": "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片湖北/{z}/{y}/{x}?type=cpbf&returnError=false",
    "name": "",
    "key": "vectortile-symbol",
    "id": "vectortile-symbol",
    "description": "图层信息",
    "info": "图层信息"
  },
  {
    "title": "热力图层",
    "source": "IGServer",
    "sourceLayer": "heatmap",
    "minZoom": 0,
    "maxZoom": 24,
    "subtype": "Heatmap",
    "icon": "icon-echarts_heatmap",
    "type": LayerType.VectorTile,
    "url": "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片湖北/{z}/{y}/{x}?type=cpbf&returnError=false",
    "name": "",
    "key": "vectortile-heatmap",
    "id": "vectortile-heatmap",
    "description": "图层信息",
    "info": "图层信息"
  },
  {
    "title": "山体阴影",
    "source": "IGServer",
    "sourceLayer": "hillshade",
    "minZoom": 0,
    "maxZoom": 24,
    "subtype": "HillShade",
    "icon": "icon-mountain-",
    "type": LayerType.VectorTile,
    "url": "http://localhost:6163/igs/rest/mrms/tile/矢量瓦片湖北/{z}/{y}/{x}?type=cpbf&returnError=false",
    "name": "",
    "key": "vectortile-hillshade",
    "id": "vectortile-hillshade",
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
