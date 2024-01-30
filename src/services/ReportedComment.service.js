import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateReportedComment(params) {
  return await formDataRequest("feeds/comments/report/create", params);
}
export async function serviceUpdateReportedComment(params) {
  return await formDataRequest("feeds/comments/report/update", params);
}
export async function serviceDeleteReportedComment(params) {
  return await postRequest("feeds/comments/report/delete", params);
}
export async function serviceGetReportedCommentDetails(params) {
  return await postRequest("feeds/comments/report/detail", params);
}
export async function serviceGetReportedComment(params) {
  return await postRequest("feeds/comments/report/list", params);
}
export async function serviceDetailsReportedComment(params) {
  return await postRequest("feeds/comments/report/detail", params);
}

export async function serviceFeedsCommentDeleteAPis(params) {
  return await postRequest("feeds/comments/delete", params);
}

export async function serviceFeedsCoomentReportsDetailsValue(params){
  return await postRequest("feeds/comments/report/detail",params)
}

