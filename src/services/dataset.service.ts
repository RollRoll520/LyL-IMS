import { get } from "../utils/request";

export const loadTrainSet = (u_id: number) => get("/dataset/get_train/" + u_id);

export const loadValidateSet = (u_id: number) =>
  get("/dataset/get_validate/" + u_id);

export const loadSingleTestSet = (u_id: number) =>
  get("/dataset/get_single_test/" + u_id);

export const loadMultipleTestSet = (u_id: number) =>
  get("/dataset/get_multiple_test/" + u_id);
