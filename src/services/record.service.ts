import { get } from "../utils/request";

export const loadTrainRecord = (): Promise<any> => get("/record/get_train/");

export const loadSingleTestRecord = (): Promise<any> =>
  get("/record/get_single_test/");

export const loadMultipleTestRecord = (): Promise<any> =>
  get("/record/get_multiple_test/");
