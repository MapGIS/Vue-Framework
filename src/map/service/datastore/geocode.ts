import { RequestMethodType } from "../service";

import { ElasticService, ElasticResponse } from "./elasticsearch";

export class GeocodeResponse extends ElasticResponse {
  "errorCode": 1; //错误码，>0表示成功，<0为错误码
  "msg": null; //错误提示
  "t": {
    pageNo: 1; //页码
    pageSize: 1; //每页数量
    rowCount: 1; //当前数量
    totalPage: 4034; //总页数
    totalCount: 4034; //总记录数据
    result: [
      {
        //结果对象
        formatAddress: "湖南省怀化市辰溪县辰阳镇武陵城酒店3层"; //全地址
        areaAddr: {
          //地区信息
          province: "湖南省"; //省级信息
          city: "怀化市"; //市级信息
          country: null; //县级信息
          town: "辰阳镇"; //街道或乡镇信息
          street: null; //道路信息
          streetNo: null; //道路号
          code: null; //地址编码
        };
        detail: {
          marker: null; //标志物
          interestpoint: null; //兴趣点
          identifier: null; //标识物
          name: "武陵城酒店"; //名称
        };
        lat: 28.00855; //纬度
        lon: 110.189906; //经度
        ext: {
          attrList: { TELEPHONE: ""; RESIDENT: ""; hotGroup: "文化教育" };
        };
      }
    ];
  };
}

/**
 * @author 创新中心-潘卓然
 * @class Webclient.Service.ElasticService
 * @category  Service
 * @classdesc DataStore-ElasticSearch服务
 * @description 该类实现了基于DataStore的各类服务的查询
 * @see https://shimo.im/docs/1d579d6a082a4631 石墨文档-MapGISDataStore服务接口-Develop-201908-v0.1
 */
export default class GeocodeService extends ElasticService {
  public ServicePath: String = "addressservice/es/location/geocode";

  /**
   * @description GET传递参数
   * @param {String} [params.typeName] - ElasticSearch中type名称，DataStore中为地址库
   * @param {String} [params.province] - 省约束信息
   * @param {String} [params.city] - 市约束信息
   * @param {String} params.keyWord - 关键词信息
   * @param {String} [params.bbox] - 矩形范围信息
   * @param {String} [params.geometry] - 多边形过滤条件，默认是geojson格式
   * @param {String} [params.filter] - 扩展属性条件，hotGroup=’社区’
   * @param {Number} [params.pageSize]  - 每页大小
   * @param {Number} [params.pageNo]  - 页码，从1开始
   */
  public params: Object;

  constructor(params) {
    super();

    const {
      typeName,
      province,
      city,
      keyWord,
      bbox,
      geometry,
      filter,
      pageSize,
      pageNo,
    } = params;

    this.method = RequestMethodType.GET;

    this.params = {
      /**
       * @description Es中type名称，DataStore中为地址库
       * @requires false
       * @type String
       * @default null
       */
      typeName: typeName || "index",

      /**
       * @description 省约束信息
       * @requires false
       * @type String
       * @default null
       */
      province: province || "湖北省",

      /**
       * @description 市约束信息
       * @requires false
       * @type String
       * @default null
       */
      city: city || "武汉市",

      /**
       * @description 关键词信息
       * @requires true
       * @type String
       */
      keyWord: keyWord || "",

      /**
       * @description 矩形范围信息
       * @requires false
       * @type String
       * @default null
       * @example
       */
      bbox: bbox || "",

      /**
       * @description 多边形过滤条件，默认是geojson格式
       * @requires false
       * @type String
       * @default
       * @example 	
            {
                "type":  "Polygon" ,
                "coordinate":  [
                    [  [35,10] , [45,45] , [15,40] , [10,20] , [35,10]  ]
                ]
            }
       */
      geometry: geometry || "",

      /**
       * @description 扩展属性条件，[field]='value'
       * @requires false
       * @type String
       * @default
       */
      filter: filter || "",

      /**
       * @description 每页大小
       * @requires false
       * @type String
       * @default 100
       */
      pageSize: pageSize || "",

      /**
       * @description 页码，从1开始
       * @requires false
       * @type String
       * @default 1
       */
      pageNo: pageNo || "",
    };
  }

  /**
   *
   * @param {String} indexName
   * @param params
   */
  result(params) {
    const promise = this.get(params);
    promise.then((res) => {
      console.log("result", res);
    });
  }

  promise(params) {
    return this.get(params);
  }
}
