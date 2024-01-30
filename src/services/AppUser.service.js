import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateAppUser(params) {
  return await formDataRequest("users/app/create", params);
}
export async function serviceUpdateAppUser(params) {
  return await formDataRequest("users/app/update", params);
}
export async function serviceDeleteAppUser(params) {
  return await postRequest("users/app/delete", params);
}
export async function serviceGetAppUserDetails(params) {
  return await postRequest("users/app/detail", params);
}
export async function serviceGetAppUser(params) {
  return await postRequest("users/app", params);
}
export async function serviceDetailsAppUser(params) {
  return await postRequest("users/detail", params);
}
export async function serviceDetailsGetBannerList(params) {
  return await postRequest("users/app/detail", params);
}

export async function feedPostAppUser(params){
   return await postRequest("feeds/by/user",params)
}

export async function feedCommentsByUser(params){
  return await postRequest("feeds/comments/by/user",params)
}

export async function feedCommentByPost(params){
  return await postRequest("feeds/comments/by/user",params)
}

export async function feedAssociateChapter(params){
  return await postRequest("users/app/chapters",params)
}

export async function serviceFeedDelete(params){
   return await postRequest("feeds/delete",params)
}

export async function serviceFeedCommentDeletePostId(params){
  return await postRequest("feeds/comments/delete",params)
}

export async function serviceFeedCommentByPost(params){
  return await postRequest("feeds/comments/by/post",params)
}

export async function serviceFeedDetailsComment(params){
  return await postRequest("feeds/detail",params)
}