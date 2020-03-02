export enum ServiceType {
    IGServer = "igserver",
    Extend = "extend"
}

export class Service {
    name: string;
    type: ServiceType;
    url: string;
    user?: string;
    password?: string;
    ip?: string;
    port?:string;
}

export const simpleService: Service = {
    name: "化简服务",
    type: ServiceType.IGServer,
    url: ""
}
export const geojsonService: Service = {
    name: "GEOJSON服务",
    type: ServiceType.IGServer,
    url: "http://localhost:6163/onemap/layer/query?gdbp={gdbp}&compress=true&level=20&page=0&pageCount=500"
}
//中国2000国家大地坐标系 
export const printMilitaryService: Service = {
    name: "军测图幅服务",
    type: ServiceType.Extend,
    url: "http://{ip}:{port}/igs/rest/mrles/CreateJBPublishData?frameNo={frameNo}&srsName={srsName}&islonlat=true"
}
//pdf输出
export const sheetPrintService: Service = {
    ip:"localhost",
    port:"6163",
    user: "admin",
    password: "sa.mapgis",
    name: "图幅打印",
    type: ServiceType.Extend,
    url: "http://{ip}:{port}/igs/rest/mrles/OutPutPdf?mapPath={mapPath}&width={width}&height={height}&mode={mode}&dataRect={dataRect}"
}
export const defaultService: Object = {
    "化简服务": simpleService,
    "GEOJSON服务": geojsonService,
    "军测图幅服务": printMilitaryService,
    "图幅打印": sheetPrintService
};