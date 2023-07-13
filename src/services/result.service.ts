import { get } from "../utils/request";

export const loadValidateHeatApi = (record_id: number) =>
  get("/result/getTest/" + record_id);

export const loadTrainHeatApi = (record_id: number) =>
  get("/result/getTest/" + record_id);
