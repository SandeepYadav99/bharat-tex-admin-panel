import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateMasterList(params) {
  return await formDataRequest("chapters/create", params);
}
export async function serviceUpdateMasterList(params) {
  return await formDataRequest("chapters/update", params);
}
export async function serviceDeleteMasterList(params) {
  return await postRequest("chapters/delete", params);
}
export async function serviceGetMasterListDetails(params) {
  return await postRequest("chapters/detail", params);
}
export async function serviceGetMasterList(params) {
  return await postRequest("chapters", params);
}
export async function serviceDetailsMasterList(params) {
  return await postRequest("chapters/details", params);
}
export async function serviceCheckMasterList(params) {
  return await postRequest("chapters/exists", params);
}
