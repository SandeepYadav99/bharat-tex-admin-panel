import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventSponsor(params) {
  return await formDataRequest("events/sponsors/create", params);
}
export async function serviceUpdateEventSponsor(params) {
  return await formDataRequest("events/sponsors/update", params);
}
export async function serviceDeleteEventSponsor(params) {
  return await postRequest("events/sponsors/delete", params);
}
export async function serviceGetEventSponsorDetails(params) {
  return await postRequest("events/sponsors/detail", params);
}
export async function serviceGetEventSponsor(params) {
  return await postRequest("events/sponsors", params);
}
export async function serviceDetailsEventSponsor(params) {
  return await postRequest("events/sponsors/detail", params);
}
export async function serviceDetailsGetSponsorList(params) {
    return await postRequest("events/sponsors/detail", params);
  }
