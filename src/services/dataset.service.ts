import { get, mulPost } from "../utils/request";

export const loadTrainSet = (): Promise<any> => get("/dataset/get_train/");

export const loadValidateSet = (): Promise<any> =>
  get("/dataset/get_validate/");

export const loadSingleTestSet = (): Promise<any> =>
  get("/dataset/get_single_test/");

export const loadMultipleTestSet = (): Promise<any> =>
  get("/dataset/get_multiple_test/");

export const uploadDatasetApi = (params: any, data: any): Promise<any> =>
  mulPost("/dataset/new", params, data);
