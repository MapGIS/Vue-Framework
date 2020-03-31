export const maxLongitude = 180;
export const minLongitude = -180;
export const maxLatitude = 180;
export const minLatitude = -180;

export const defautPrecision = 0.0000000001;

export class Lnglat {
  lng: number;
  lat: number;

  constructor(lng, lat) {
    this.lng = lng;
    this.lat = lat;
  }

  fix(precision?: number) {
    precision = precision || defautPrecision;
    if (this.lng > maxLongitude) {
      this.lng = maxLongitude - precision;
    }
    if (this.lng < minLongitude) {
      this.lng = minLongitude + precision;
    }
    if (this.lat > maxLatitude) {
      this.lat = maxLatitude - precision;
    }
    if (this.lat < minLatitude) {
      this.lat = minLatitude + precision;
    }
  }

  static fromObject(lnglat: any, precision?: number): Lnglat {
    precision = precision || defautPrecision;
    if (lnglat.lng === undefined || lnglat.lat === undefined) {
      return new Lnglat(0, 0);
    }

    let { lng, lat } = lnglat;

    if (lng > maxLongitude) {
      lng = maxLongitude - precision;
    }
    if (lng < minLongitude) {
      lng = minLongitude + precision;
    }
    if (lat > maxLatitude) {
      lat = maxLatitude - precision;
    }
    if (lat < minLatitude) {
      lat = minLatitude + precision;
    }
    return new Lnglat(lng, lat);
  }
}

export default Lnglat;
