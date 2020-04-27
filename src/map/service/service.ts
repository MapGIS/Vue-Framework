export enum ServiceType {
    IGServer = "igserver",
    DataStore = "datastore",
    Extend = "extend"
}

export enum RequestMethodType {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete'
}

export class Service {
    name: string;
    type: ServiceType;
    url: string;
    method?: string;
    user?: string;
    password?: string;
    ip?: string;
    port?:string;
}

// export { defaultService } from './defaultservice'
