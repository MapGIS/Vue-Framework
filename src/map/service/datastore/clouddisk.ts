import { Service, ServiceType, RequestMethodType } from '../service';

export const saveService: Service = {
    name: "上传服务",
    type: ServiceType.DataStore,
    method: RequestMethodType.POST,
    url: "http://{ip}:{port}/clouddisk/rest/file/project/save?folderDir={folderDir}&identifier={identifier}&fileName={fileName}&Authorization={Authorization}"
}
