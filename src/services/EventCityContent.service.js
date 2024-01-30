import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventCityContent(params) {
  return await postRequest("events/city/guide/contents/create", params);
}
export async function serviceUpdateEventCityContent(params) {
  return await postRequest("events/city/guide/contents/update", params);
}
export async function serviceDeleteEventCityContent(params) {
  return await postRequest("events/city/guide/contents/delete", params);
}
export async function serviceGetEventCityContentDetails(params) {
  return await postRequest("events/city/guide/contents/detail", params);
}
export async function serviceGetEventCityContent(params) {
  return await postRequest("events/city/guide/contents", params);
}
export async function serviceDetailsEventCityContent(params) {
  return await postRequest("events/city/guide/contents/detail", params);
}
