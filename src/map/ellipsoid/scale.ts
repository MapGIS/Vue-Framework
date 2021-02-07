import { point } from "@turf/helpers";
import distance from "@turf/distance";
import { Lnglat } from "../geom";

export class Scale {
  getScaleByLonlat(lonlat1: Lnglat, lonlat2: Lnglat): number {
    lonlat1.fix();
    lonlat2.fix();

    let from = point([lonlat1.lng, lonlat1.lat]);
    let to = point([lonlat2.lng, lonlat2.lat]);

    let maxMeters = distance(from, to, { units: "meters" });

    /* let meters = this.getRoundNum(maxMeters);
        let label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
        let scale = {
            showMeters : meters,
            trueMeters : maxMeters,
            label : label,
            unit : label
        } */
    return maxMeters;
  }
}
