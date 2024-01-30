import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateEventOrganiserUser(params) {
  return await formDataRequest("events/organising/committee/user/create", params);
}
export async function serviceGetEventOrganiserUserDetails(params) {
  return await postRequest("events/organising/committee/user/detail", params);
}

export async function serviceUpdateEventOrganiserUser(params) {
  return await formDataRequest("events/organising/committee/user/update", params);
}

export async function serviceResetPasswordEventOrganiserUser(params) {
  return await postRequest('events/organising/committee/user/reset/password', params);
}
export async function serviceUpdateEventOrganiserUserSearch(params) {
  return await postRequest("events/organising/committee/user/autocomplete", params);
}
export async function serviceDeleteEventOrganiserUser(params) {
  return await postRequest("events/organising/committee/user/delete", params);
}

export async function serviceGetEventOrganiserUser(params) {
  return await postRequest("events/organising/committee/user", params);
}

export async function serviceEventOrganiserUserCheck(params) {
  return await postRequest("events/organising/committee/user/check", params);
}

