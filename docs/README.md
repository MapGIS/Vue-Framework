---
home: true
heroImage: /logo.svg
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: Vue/React/CommonJS
    details: 本全局通信机制兼容Vuex/Rudex,Mobx多种全局事件管理框架
  - title: 地图文档的集中式管理
    details: 将组件化的地图组件统一通过全局地图文档的方式来集中管理，地图文档作为唯一的入口，减少学习成本
  - title: TypeScript
    details: 全部通过TypeScript实现，基本的类型检查减少BUG，对象的继承，接口的封装优化代码结构
footer: MIT Licensed
---

``` json
{
    "name": "默认地图文档",  //地图文档名称
    "current": {             //当前选中图层
        "id": "治愈图层",
        "type": "VectorTile",
        "name": "治愈图层"
    },
    "backgrounds": [
        {
            "title": "浅色背景",
            "name": "MapBox浅色背景",
            "type": "BackGround",
            "tileUrl": "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?"
        }
    ],
    "layers": [
        {
            "id": "治愈图层",
            "type": "VectorTile",
            "name": "治愈图层"
        },
        {
            "title": "组图层",
            "name": "组图层",
            "children": [
                {//childlayer1},
                {//childlayer2},
                {//childlayer3}
            ],
            "type": "GroupLayer"
        }
    ],
    //数据源
    "sources": {   
        "肺炎数据": {
            "type": "VectorTile",
            "name": "肺炎数据",
            "minZoom": 0,
            "maxZoom": 20,
            "url": "http://localhost:6163/igs/rest/mrms/tile/肺炎/{z}/{y}/{x}?type=cpbf&returnError=false"
        }
    },
    //拓展服务
    "service": {  
        "GEOJSON服务": {
            "name": "GEOJSON服务",
            "type": "igserver",
            "url": "http://localhost:6163/onemap/layer/query"
        },
        "图幅打印": {
            "ip": "localhost",
            "port": "6163",
            "user": "admin",
            "password": "sa.mapgis",
            "name": "图幅打印",
            "type": "extend",
            "url": "http://{ip}:{port}/igs/rest/mrles/OutPutPdf?"
        }
    },
    //地图渲染模式 mapboxgl/leaflet/cesium
    "maprender": "mapboxgl",  
    //地图范围
    "bounds": {               
        "west": -180,
        "north": 90,
        "east": 180,
        "south": -90
    },
    // 图例版
    "sprite": "http://localhost:6163/igs/rest/mrms/vtiles/sprite",   
    // 字体库
    "glyphs": "http://localhost:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
    // 坐标系 & 投影
    "crs": {
        "epsg": "EPSG_3857",
        "proj": "+proj=merc +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
    }
}
```
