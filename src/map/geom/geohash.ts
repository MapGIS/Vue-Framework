// geohash.js
// Geohash library for Javascript
// (c) 2008 David Troy
// Distributed under the MIT License

const BITS = [16, 8, 4, 2, 1];

const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
const NEIGHBORS = {
    right: { even: "bc01fg45238967deuvhjyznpkmstqrwx", odd: undefined },
    left: { even: "238967debc01fg45kmstqrwxuvhjyznp", odd: undefined },
    top: { even: "p0r21436x8zb9dcf5h7kjnmqesgutwvy", odd: undefined },
    bottom: { even: "14365h7k9dcfesgujnmqp0r2twvyx8zb", odd: undefined }
};
const BORDERS = {
    right: { even: "bcfguvyz", odd: undefined },
    left: { even: "0145hjnp", odd: undefined },
    top: { even: "prxz", odd: undefined },
    bottom: { even: "028b", odd: undefined }
};

NEIGHBORS.bottom.odd = NEIGHBORS.left.even;
NEIGHBORS.top.odd = NEIGHBORS.right.even;
NEIGHBORS.left.odd = NEIGHBORS.bottom.even;
NEIGHBORS.right.odd = NEIGHBORS.top.even;

BORDERS.bottom.odd = BORDERS.left.even;
BORDERS.top.odd = BORDERS.right.even;
BORDERS.left.odd = BORDERS.bottom.even;
BORDERS.right.odd = BORDERS.top.even;

export class GeoHash {
    static decodeGeoHash(geohash) {
	let IS_EVEN = true;
	const lat = [-90.0, 90.0];
        const lon = [-180.0, 180.0];
	let LAT_ERR = 90.0;
	let LON_ERR = 180.0;

	for (const c of geohash) {
	    const cd = BASE32.indexOf(c);
	    for (let j = 0; j < 5; j++) {
		const mask = BITS[j];
		if (IS_EVEN) {
		    LON_ERR /= 2;
		    this.refine_interval(lon, cd, mask);
		} else {
		    LAT_ERR /= 2;
		    this.refine_interval(lat, cd, mask);
		}
		IS_EVEN = !IS_EVEN;
	    }
	}
	lat[2] = (lat[0] + lat[1]) / 2;
	lon[2] = (lon[0] + lon[1]) / 2;

	return { latitude: lat, longitude: lon };
    }

    static encodeGeoHash(latitude, longitude) {
	let IS_EVEN = true;
	const i = 0;
	const lat = [];
        const lon = [];
	let bit = 0;
	let ch = 0;
	const precision = 12;
	let geohash = "";

	lat[0] = -90.0; lat[1] = 90.0;
	lon[0] = -180.0; lon[1] = 180.0;

	while (geohash.length < precision) {
	    if (IS_EVEN) {
		const mid = (lon[0] + lon[1]) / 2;
		if (longitude > mid) {
		    ch |= BITS[bit];
		    lon[0] = mid;
		} else {
                    lon[1] = mid;
                }
	    } else {
		const mid = (lat[0] + lat[1]) / 2;
		if (latitude > mid) {
		    ch |= BITS[bit];
		    lat[0] = mid;
		} else {
                    lat[1] = mid;
                }
	    }

	    IS_EVEN = !IS_EVEN;
	    if (bit < 4) {
                bit++;
            } else {
		geohash += BASE32[ch];
		bit = 0;
		ch = 0;
	    }
	}
	return geohash;
    }

    static decodeGeoHashToPolygon(geohash) {
	let IS_EVEN = true;
	const lat = [];
        const lon = [];
	lat[0] = -90.0; lat[1] = 90.0;
	lon[0] = -180.0; lon[1] = 180.0;
	let LAT_ERR = 90.0; let LON_ERR = 180.0;

	for (const c of geohash) {
	    const cd = BASE32.indexOf(c);
	    for (let j = 0; j < 5; j++) {
		const mask = BITS[j];
		if (IS_EVEN) {
		    LON_ERR /= 2;
		    this.refine_interval(lon, cd, mask);
		} else {
		    LAT_ERR /= 2;
		    this.refine_interval(lat, cd, mask);
		}
		IS_EVEN = !IS_EVEN;
	    }
	}
	lat[2] = (lat[0] + lat[1]) / 2;
	lon[2] = (lon[0] + lon[1]) / 2;

	const topleft = [lon[0], lat[1]];
	const topright = [lon[1], lat[1]];
	const bottomright = [lon[1], lat[0]];
	const bottomleft = [lon[0], lat[0]];

	return [[topleft, topright, bottomright, bottomleft, topleft]];
    }

        private static refine_interval(interval, cd, mask) {
	if (cd && mask) {
            interval[0] = (interval[0] + interval[1]) / 2;
        } else {
	    interval[1] = (interval[0] + interval[1]) / 2;
        }
    }

    private static calculateAdjacent(srcHash, dir) {
	srcHash = srcHash.toLowerCase();
	const lastChr = srcHash.charAt(srcHash.length - 1);
	const type = (srcHash.length % 2) ? 'odd' : 'even';
	let base = srcHash.substring(0, srcHash.length - 1);
	if (BORDERS[dir][type].indexOf(lastChr) !== -1) {
            base = this.calculateAdjacent(base, dir);
        }
	return base + BASE32[NEIGHBORS[dir][type].indexOf(lastChr)];
    }
}
