import API from "../API";

import { Service, ServiceType } from "../service";

export class ElasticResponse {
    errorCode: 1; // 错误码，>0表示成功，<0为错误码
    msg: null; // 错误提示
    t: {};
}

/**
 * @author 创新中心-潘卓然
 * @class Webclient.Service.ElasticService
 * @category  Service
 * @classdesc DataStore-ElasticSearch服务
 * @description 该类实现了基于DataStore的各类服务的查询
 * @see https://shimo.im/docs/1d579d6a082a4631 石墨文档-MapGISDataStore服务接口-Develop-201908-v0.1
 */
export class ElasticService extends Service {
    /**
     * @description 传递参数
     */
    public params: object;
    /**
     * @description 服务路径名，多个索引使用,分割，如index1,index2
     */
    public ServicePath: string = "addressservice/es/location/geocode";

    /**
     * @description 地址库名，多个索引使用,分割，如index1,index2
     */
    private indexName: string = "indexName";

    /**
     * @description ElasticService全局公共api接口
     */
    private api: any;

    constructor() {
        super();
        this.api = new API();
        this.name = "DataStore地名地址服务";
        this.type = ServiceType.DataStore;
        this.url =
            "http://{ip}:{port}/addressservice/es/location/geocode/{indexName}";
        this.indexName = "indexName";
    }

    setParams(params) {
        this.params = { ...params };
    }

    initPath() {
        const {
            protocol,
            ip,
            port,
            url,
            baseUrl,
            indexName,
            ServicePath,
            api,
        } = this;

        let path;

        if (baseUrl) {
            api.setBaseUrl(baseUrl);
            path = `${baseUrl}/${ServicePath}/${indexName}`;
        } else if (ip && port) {
            path = `${protocol}://${ip}:${port}/${ServicePath}/${indexName}`;
        } else if (url) {
            path = `${url}/${indexName}`;
        }
        return path;
    }

    /**
     *
     * @param {String} indexName
     * @param params
     */
    get(params) {
        const { authorization, api } = this;
        const path = this.initPath();

        if (authorization) {
            api.setAuthorization(authorization);
        }

        return api.get(path, params);
    }
}

export default ElasticService;
