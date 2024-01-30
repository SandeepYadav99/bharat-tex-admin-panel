import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateReportedPost(params) {
  return await formDataRequest("feeds/report/create", params);
}
export async function serviceUpdateReportedPost(params) {
  return await formDataRequest("feeds/report/update", params);
}
export async function serviceDeleteReportedPost(params) {
  return await postRequest("feeds/report/delete", params);
}
export async function serviceGetReportedPostDetails(params) {
  return await postRequest("feeds/report/detail", params);
}
export async function serviceGetReportedPost(params) {
  return await postRequest("feeds/report/list", params);
}
export async function serviceDetailsReportedPost(params) {
  return await postRequest("feeds/report/detail", params);
}

export async function serviceDeleteReportedFeedPostValue (params){
  return await postRequest("feeds/delete", params);

}
export async function serviceReportedByPostData (params){
  return await postRequest("feeds/report/by/post", params);
}