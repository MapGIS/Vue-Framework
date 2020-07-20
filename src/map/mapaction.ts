import { MapRender } from "./document";

class GeoBounds {
    west: number;
    north: number;
    east: number;
    south: number;

    constructor(west, south, east, north) {
        this.west = west;
        this.south = south;
        this.east = east;
        this.north = north;
    }

    geojson() {
        return {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [this.west, this.south],
                        [this.east, this.south],
                        [this.east, this.north],
                        [this.west, this.north],
                        [this.west, this.south],
                    ],
                ],
            },
        };
    }
}

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
