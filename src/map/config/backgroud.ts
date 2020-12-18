export let defaultBackground = {
  title: "浅色背景",
  name: "MapGIS浅色背景",
  id: "mapgislight",
  key: "mapgislight",
  icon: "icon-background",
  type: "background",
  tileUrl: "static/tiles/EPSG3857_Light/{z}/{x}/{y}.png",
  imgUrl:
    "https://user-images.githubusercontent.com/23654117/56859979-16e31c80-69c4-11e9-9b5d-12d48eb85f0d.png",
};

export let backgrounds = [
  {
    title: "空背景",
    name: "空背景",
    id: "empty",
    key: "empty",
    icon: "icon-background",
    type: "background",
  },
  {
    title: "浅色背景",
    name: "MapGIS浅色背景",
    id: "mapgislight",
    key: "mapgislight",
    icon: "icon-background",
    type: "background",
    tileUrl: "static/tiles/EPSG3857_Light/{z}/{x}/{y}.png",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859979-16e31c80-69c4-11e9-9b5d-12d48eb85f0d.png",
  },
  {
    title: "黑色背景",
    name: "MapGIS黑色背景",
    id: "mapgisdark",
    key: "mapgisdark",
    icon: "icon-background",
    type: "background",
    tileUrl:
      "static/tiles/EPSG3857_Dark/{z}/{x}/{y}.png",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859978-164a8600-69c4-11e9-97bc-6bf8439483b0.png",
  },
  {
    title: "蓝色背景",
    name: "MapGIS蓝色背景",
    id: "mapgisblue",
    key: "mapgisblue",
    icon: "icon-background",
    type: "background",
    tileUrl:
      "static/tiles/EPSG3857_Blue/{z}/{x}/{y}.png",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859978-164a8600-69c4-11e9-97bc-6bf8439483b0.png",
  },
  {
    title: "街道地图",
    name: "MapGIS街道地图",
    id: "mapgisstreets",
    key: "mapgisstreets",
    icon: "icon-background",
    type: "background",
    tileUrl:
      "static/tiles/EPSG3857_Street/{z}/{x}/{y}.png",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859980-16e31c80-69c4-11e9-9e15-0980bd7ff947.png",
  },
];

export function getBackground(id: string) {
  if (backgrounds.length <= 0) return defaultBackground;
  for (var i = 0; i < backgrounds.length; i++) {
    if (backgrounds[i].id == id) {
      return backgrounds[i];
    }
  }
  return defaultBackground;
}

export default backgrounds;
