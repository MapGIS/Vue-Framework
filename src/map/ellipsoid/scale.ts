import { point } from "@turf/helpers";
import distance from "@turf/distance";
import { Lnglat } from "../geom";
import { Bounds, GeoBounds, ArrayBounds, CornerBounds } from '../map'

export class Scale {
    getScaleByLonlat(lonlat1: Lnglat, lonlat2: Lnglat): number {
        lonlat1.fix();
        lonlat2.fix();

        const from = point([lonlat1.lng, lonlat1.lat]);
        const to = point([lonlat2.lng, lonlat2.lat]);

        const maxMeters = distance(from, to, { units: "meters" });
        return maxMeters;
    }

    getScaleByBounds(bounds: any): number {
        // let sw;
        // let ne;
        // if (bounds instanceof GeoBounds) {
        //     sw = [bounds.west, bounds.south];
        //     ne = [bounds.east, bounds.north];
        // } else if (bounds instanceof ArrayBounds) {
        //     sw = [bounds[0], bounds[1]];
        //     ne = [bounds[2], bounds[3]];
        // } else if (bounds instanceof CornerBounds) {
        //     sw = bounds[0];
        //     ne = bounds[1];
        // }

        // const from = point(sw);
        // const to = point(ne);

        // const maxMeters = distance(from, to, { units: "meters" });
        // return maxMeters;
        return 0;
    }

    getScaleByBbox(bbox: number[]): number {
        let sw;
        let ne;

        sw = [bbox[0], bbox[1]];
        ne = [bbox[2], bbox[3]];

        const from = point(sw);
        const to = point(ne);

        const maxMeters = distance(from, to, { units: "meters" });
        return maxMeters;
    }
}
