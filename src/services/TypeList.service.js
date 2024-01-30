import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateTypeList(params) {
  return await formDataRequest("events/sponsors/type/create", params);
}
export async function serviceUpdateTypeList(params) {
  return await postRequest("events/sponsors/type/update", params);
}
export async function serviceDeleteTypeList(params) {
  return await postRequest("events/sponsors/type/delete", params);
}
export async function serviceGetTypeListDetails(params) {
  return await postRequest("events/sponsors/type/detail", params);
}
export async function serviceGetTypeList(params) {
  return await postRequest("events/sponsors/type", params);
}
export async function serviceDetailsTypeList(params) {
  return await postRequest("events/sponsors/type/detail", params);
}
