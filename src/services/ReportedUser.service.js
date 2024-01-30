import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateReportedUser(params) {
  return await formDataRequest("feeds/reported/user/create", params);
}
export async function serviceUpdateReportedUser(params) {
  return await formDataRequest("feeds/reported/user/update", params);
}
export async function serviceDeleteReportedUser(params) {
  return await postRequest("feeds/reported/user/delete", params);
}
export async function serviceGetReportedUserDetails(params) {
  return await postRequest("feeds/reported/user/detail", params);
}
export async function serviceGetReportedUser(params) {
  return await postRequest("feeds/reported/user", params);
}
export async function serviceDetailsReportedUser(params) {
  return await postRequest("feeds/reported/user/detail", params);
}
