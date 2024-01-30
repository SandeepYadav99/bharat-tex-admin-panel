import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateCityAssocList(params) {
  return await formDataRequest("chapters/create", params);
}
export async function serviceUpdateCityAssocList(params) {
  return await formDataRequest("chapters/update", params);
}
export async function serviceDeleteCityAssocList(params) {
  return await postRequest("chapters/delete", params);
}
export async function serviceGetCityAssocListDetails(params) {
  return await postRequest("chapters/detail", params);
}
export async function serviceGetCityAssocList(params) {
  return await postRequest("chapters", params);
}
export async function serviceDetailsCityAssocList(params) {
  return await postRequest("chapters/detail", params);
}
export async function serviceCheckCityAssocList(params) {
  return await postRequest("chapters/exists", params);
}
