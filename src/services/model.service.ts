import { get, post } from "../utils/request";

export const trainModelApi = (params:any): Promise<any> => post("/model/train/",params);

export const customTestApi = (params: any): Promise<any> =>
  post("/model/customTest/", params);

export const getModelApi = (record_id:any):Promise<any> =>get("/model/get_custom/"+record_id);