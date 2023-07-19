import { get } from "../utils/request";

export const loadTrainHeatApi = (record_id: number) =>
  get("/result/get_train_heat/" + record_id);

export const loadTrainReportApi = (record_id: number) =>
  get("/result/get_train_report/" + record_id);

export const loadValidateHeatApi = (record_id: number) =>
  get("/result/get_validate_heat/" + record_id);

export const loadValidateReportApi = (record_id: number) =>
  get("/result/get_validate_report/" + record_id);
export const loadTestResultApi = (record_id: number) =>
  get("/result/get_test/" + record_id);
export const loadSingleTestResultApi = (record_id: number) =>
  get("/result/get_single_test/" + record_id);

export const downloadTestApi = (record_id: any): Promise<any> =>
  get("/result/download_test/" + record_id);
