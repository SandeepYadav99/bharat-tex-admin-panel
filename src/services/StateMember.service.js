import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateStateMember(params) {
  return await formDataRequest("chapters/state/create", params);
}
export async function serviceUpdateStateMember(params) {
  return await formDataRequest("chapters/state/update", params);
}
export async function serviceDeleteStateMember(params) {
  return await postRequest("chapters/state/delete", params);
}
export async function serviceGetStateMemberDetails(params) {
  return await postRequest("chapters/state/detail", params);
}
export async function serviceGetStateMember(params) {
  return await postRequest("chapters/members/users", params);
}
export async function serviceDetailsStateMember(params) {
  return await postRequest("chapters/state/detail", params);
}
export async function serviceCheckStateMember(params) {
  return await postRequest("chapters/state/exists", params);
}
