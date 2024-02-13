import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventUser(params) {
  return await formDataRequest("events/schedule/categories/create", params);
}
export async function serviceUpdateEventUser(params) {
  return await postRequest("events/schedule/categories/update", params); // /schedule/categories/update
}
export async function serviceDeleteEventUser(params) {
  return await postRequest("events/help/desk/categories/delete", params);
}
export async function serviceGetEventUserDetails(params) {
  return await postRequest("events/schedule/categories/detail", params);
}
export async function serviceGetEventUser(params) {
  return await postRequest("events/schedule/categories", params); // events/schedule/categories
}
export async function serviceDetailsEventUser(params) {
  return await postRequest("events/schedule/categories/detail", params);
}
