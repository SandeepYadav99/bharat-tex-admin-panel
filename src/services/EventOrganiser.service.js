import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateEventOrganiser(params) {
  return await formDataRequest("events/organising/committee/create", params);
}
export async function serviceGetEventOrganiserDetails(params) {
  return await postRequest("events/organising/committee/detail", params);
}

export async function serviceUpdateEventOrganiser(params) {
  return await postRequest("events/organising/committee/update", params);
}

export async function serviceResetPasswordEventOrganiser(params) {
  return await postRequest('events/organising/committee/reset/password', params);
}
export async function serviceUpdateEventOrganiserSearch(params) {
  return await postRequest("events/organising/committee/autocomplete", params);
}
export async function serviceDeleteEventOrganiser(params) {
  return await postRequest("events/organising/committee/delete", params); // events/organising/committee/delete
}

export async function serviceGetEventOrganiser(params) {
  return await postRequest("events/organising/committee", params);
}

export async function serviceEventOrganiserCheck(params) {
  return await postRequest("events/organising/committee/check", params);
}

