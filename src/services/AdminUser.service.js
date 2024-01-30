import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateAdminUser(params) {
  return await formDataRequest("users/create", params);
}
export async function serviceGetAdminUserDetails(params) {
  return await postRequest("users/detail", params);
}

export async function serviceUpdateAdminUser(params) {
  return await formDataRequest("users/update", params);
}
export async function serviceUpdateAdminUserSearch(params) {
  return await postRequest("users/autocomplete", params);
}
export async function serviceDeleteAdminUser(params) {
  return await postRequest("users/delete", params);
}

export async function serviceGetAdminUser(params) {
  return await postRequest("users/admin", params);
}

export async function serviceAdminUserCheck(params) {
  return await postRequest("users/check", params);
}

export async function serviceAdminUserUpdateHead(params) {
  return await postRequest("users/update/head", params);
}

export async function serviceAdminUserUpdate(params) {
  return await postRequest("users/update/userss", params);
}

export async function serviceAdminUsers(params) {
  return await postRequest("users/userss", params);
}
export async function serviceClaimAdminUsers(params) {
  return await postRequest("users/claim/panelists", params);
}
export async function serviceAdminUserClaimUpdate(params) {
  return await postRequest("users/update/claim/panelists", params);
}

export async function serviceAdminUserPasswordUpdate(params) {
  return await postRequest("users/update/password", params);
}
export async function serviceAdminUserCheckExist(params) {
  return await postRequest("users/exists", params);
}