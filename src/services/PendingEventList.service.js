import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreatePendingEventList(params) {
  return await formDataRequest("events/review/create", params);
}
export async function serviceUpdatePendingEventList(params) {
  return await postRequest("events/review/update", params);
}
export async function serviceDeletePendingEventList(params) {
  return await postRequest("events/review/delete", params);
}
export async function serviceGetPendingEventListDetails(params) {
  return await postRequest("events/detail", params);
}
export async function serviceGetPendingEventList(params) {
  return await postRequest("events/review", params);
}
export async function serviceDetailsPendingEventList(params) {
  return await postRequest("events/review/details", params);
}
export async function serviceCheckPendingEventList(params) {
  return await postRequest("events/review/exists", params);
}
export async function serviceApprovePendingEventList(params) {
  return await postRequest("events/review/accept", params);
}
export async function serviceRejectPendingEventList(params) {
  return await postRequest("events/review/reject", params);
}
