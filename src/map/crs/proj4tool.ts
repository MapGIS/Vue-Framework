import EPSG from "./epsg";

// import * as proj4 from "proj4";
// import proj4 from "proj4";

// import * as proj4x from 'proj4';
// const proj4 = (proj4x as any).default;

export class ProjectTool {
  static getProj4sCascader() {
    var options = Object.keys(EPSG).map(function (key) {
      var menu = {
        value: key,
        label: key,
        children: []
      };
      menu.children = EPSG[key].map(function (epsg) {
        return { value: epsg.id, label: epsg.name };
      });
      return menu;
    });
    return options;
  }

  static getProj4sDetail(id) {
    var detail = "";
    var keys = Object.keys(EPSG);
    for (var i = 0; i < keys.length; i++) {
      var epsgs = EPSG[keys[i]];
      for (var j = 0; j < epsgs.length; j++) {
        var item = epsgs[j];
        if (item.id == id) {
          detail = item.strProject;
          break;
        }
      }
      if (detail != "") break;
    }
    return detail;
  }

  static proj4Transform(
    source: string,
    destination: string,
    point: Array<number>
  ) {
    return [0, 0];
    /* var proj = proj4(source, destination);
    var projpoint = proj.forward(point);
    return projpoint; */
  }
}
