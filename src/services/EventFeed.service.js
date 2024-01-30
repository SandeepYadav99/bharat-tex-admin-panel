import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventFeed(params) {
  return await formDataRequest("feeds/create", params);
}
export async function serviceUpdateEventFeed(params) {
  return await postRequest("feeds/update", params);
}
export async function serviceDeleteEventFeed(params) {
  return await postRequest("feeds/delete", params);
}
export async function serviceGetEventFeedDetails(params) {
  return await postRequest("feeds/comments/by/post", params);
}
export async function serviceGetEventFeed(params) {
  return await postRequest("feeds/by/event", params);
}
export async function serviceDetailsEventFeed(params) {
  return await postRequest("feeds/detail", params);
}
export async function serviceDeleteCommentFeed(params) {
  return await postRequest("feeds/comments/delete", params);
}