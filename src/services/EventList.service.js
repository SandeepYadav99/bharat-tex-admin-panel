import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventList(params) {
  return await formDataRequest("events/create", params);
}
export async function serviceUpdateEventList(params) {
  return await formDataRequest("events/update", params);
}
export async function serviceDeleteEventList(params) {
  return await postRequest("events/delete", params);
}
export async function serviceGetEventListDetails(params) {
  return await postRequest("events/detail", params);
}
export async function serviceGetEventBoolsDetails(params) {
  return await postRequest("events/boolstatus", params);
}
export async function serviceUpdateEventTimer(params) {
  return await postRequest("events/update/timer", params);
}
export async function serviceUpdateEventStatus(params) {
  return await postRequest("events/update/status", params);
}
export async function serviceUpdateEventPoll(params) {
  return await postRequest("events/update/poll", params);
}
export async function serviceUpdateEventReg(params) {
  return await postRequest("events/update/registration", params);
}

export async function serviceGetEventList(params) {
  return await postRequest("events", params);
}
export async function serviceDetailsEventList(params) {
  return await postRequest("events/details", params);
}
export async function serviceCheckEventList(params) {
  return await postRequest("events/exists", params);
}


