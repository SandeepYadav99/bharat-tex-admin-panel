import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateBusinessList(params) {
  return await formDataRequest("business/greating/create", params);
}
export async function serviceUpdateBusinessList(params) {
  return await formDataRequest("business/greating/update", params);
}
export async function serviceDeleteBusinessList(params) {
  return await postRequest("events/delete", params);
}
export async function serviceGetBusinessListDetails(params) {
  return await postRequest("business/greating/detail", params);
}
export async function serviceGetBusinessBoolsDetails(params) {
  return await postRequest("events/boolstatus", params);
}
export async function serviceUpdateBusinessTimer(params) {
  return await postRequest("events/update/timer", params);
}
export async function serviceUpdateBusinessStatus(params) {
  return await postRequest("events/update/status", params);
}
export async function serviceUpdateBusinessPoll(params) {
  return await postRequest("events/update/poll", params);
}
export async function serviceUpdateBusinessReg(params) {
  return await postRequest("events/update/registration", params);
}

export async function serviceGetBusinessList(params) {
  return await postRequest("business/greating", params);
}
export async function serviceDetailsBusinessList(params) {
  return await postRequest("events/details", params);
}
export async function serviceCheckBusinessList(params) {
  return await postRequest("events/exists", params);
}
