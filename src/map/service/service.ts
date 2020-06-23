export enum ServiceType {
  IGServer = "igserver",
  DataStore = "datastore",
  Extend = "extend",
}

export enum RequestMethodType {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
}

export class Service {
  /**
   * @description 服务名称
   */
  public name: string;
  /**
   * @description 服务名称
   * @see ServiceType
   */
  public type: ServiceType;
  /**
   * @description 服务类型，表示是单机的IGServer 还是分布式的DataStore
   */
  public url: string;
  /**
   * @description 基地址,用来描述IGserver/DataStore的基地址
   * @example http://{ip}:{port}/{service_root_path}
   */
  public baseUrl?: string;
  /**
   * @description 服务请求类型
   * @see RequestMethodType
   */
  public method?: string;
  public user?: string;
  public password?: string;

  /**
   * @description 网络请求方式
   * @default 'http'
   */
  public protocol?: string;
  /**
   * @description 服务ip地址
   */
  public ip?: string;
  /**
   * @description 服务端口
   */
  public port?: string;
  /**
   * @description 服务参数
   */
  public params?: Object;

  /**
   * @description 验证头秘钥
   */
  public authorization?: String;
}

// export { defaultService } from './defaultservice'
