import { MapRender } from "./document";
import { GeoBounds } from "./map";

export function BoundsToMap(bounds: any, map: MapRender) {
    let result = null;

    if (map == MapRender.MapBoxGL) {
        if (!map || !bounds)
            return [
                [-180, -90],
                [180, 90],
            ];

        bounds = bounds as GeoBounds;
        result = [
            [bounds.west, bounds.south],
            [bounds.east, bounds.north],
        ];
    } else if (map == MapRender.Cesium) {
    }
    return result;
}

export function MapToBounds(bounds: any, map: MapRender): GeoBounds {
    let result = null;

    if (map == MapRender.MapBoxGL) {
        if (!map || !bounds) return new GeoBounds(-180, -90, 180, 90);
        result = new GeoBounds(
            bounds.getEast(),
            bounds.getSouth(),
            bounds.getWest(),
            bounds.getNorth()
        );
    } else if (map == MapRender.Cesium) {
        const { east, south, west, north } = bounds;
        result = new GeoBounds(east, south, west, north);
    }
    return result;
}
