import turfbbox from "@turf/bbox";
import { MapRender } from "../document";

export class GeojsonFeature {
  private feature = undefined;
  private bounds: any = undefined;

  constructor() {}

  createFeature(feature) {
    this.feature = feature;
  }

  createGeomtry(geometry) {
    this.feature = {
      geometry: geometry,
    };
  }

  createProperties(properties) {
    this.feature = {
      properties: properties,
    };
  }

  getFeature() {
    return this.feature;
  }

  getBounds(maprender?: MapRender | string) {
    this.bbox();
    const { bounds } = this;
    if (maprender === MapRender.MapBoxGL || maprender === "mapboxgl") {
      return [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ];
    } else if (maprender === MapRender.Cesium || maprender === "cesium") {
    }
    return bounds;
  }

  bbox() {
    this.bounds = turfbbox(this.feature);
    return this.bounds;
  }
}

export class GeojsonCollection {
  private data = {
    type: "FeatureCollection",
    features: [],
  };

  public bounds: any = undefined;

  constructor(features?: Array<GeojsonFeature> | Array<Object>) {
    if (features instanceof Array) {
      this.data.features = features || [];
    } else {
      this.data.features = [features];
    }
  }

  addFeature(feature: GeojsonFeature | any) {
    if (feature instanceof GeojsonFeature) {
      this.data.features.push(feature.getFeature());
    } else {
      this.data.features.push(feature);
    }
  }

  setFeatures(features) {
    this.data.features = features;
  }

  getData() {
    return this.data;
  }

  getBounds(maprender?: MapRender | string) {
    this.bbox();
    const { bounds } = this;
    if (maprender === MapRender.MapBoxGL || maprender === "mapboxgl") {
      return [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ];
    } else if (maprender === MapRender.Cesium || maprender === "cesium") {
    }
    return bounds;
  }

  bbox() {
    this.bounds = turfbbox(this.data);
    return this.bounds;
  }
}
