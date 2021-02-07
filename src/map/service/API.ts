"use strict";
/**
 * @author 创新中心-潘卓然
 * @description 通用服务的封装类
 */

import axios from 'axios';
// const qs = require('qs');

// import axios from "axios";
// import qs from "qs";

import { deepCopy } from "../../utils/deepequal";

const config = {
    url: "localhost",
    method: "post",
    baseURL: "http://localhost:8080",
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    headers: { "Content-Type": "application/json" },
};

/**
 *
 */
export class API {
    private config;
    constructor() {
        this.config = deepCopy(config);
    }

    put(url, param) {
        return this._request(url, "put", param);
    }

    post(url, param) {
        return this._request(url, "post", param);
    }

    get(url, param) {
        if (param) {
            // url = url + "?" + qs.stringify(param);
        }
        return this._request(url, "get", {});
    }

    setBaseUrl(url) {
        this.config.baseURL = url;
    }

    setAuthorization(authorization) {
        this.config.headers.Authorization = authorization;
    }

    setContentType(type) {
        this.config.headers["Content-Type"] = type;
    }

    _request(url, type, param) {
        this.config.method = type;

        let request;
        if (type === "get") {
            request = axios.get(url, this.config);
        } else if (type === "post") {
            request = axios.post(url, param, this.config);
        } else if (type === "put") {
            request = axios.put(url, param, this.config);
        }

        /* request.then((response) => {
           this.view && this.view.$Loading.finish();
           }).catch((error) => {
           this.view && this.view.$Loading.error();
           }); */
        return request;
    }
}

export default API;
