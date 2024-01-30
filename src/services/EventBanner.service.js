import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventBanner(params) {
  return await formDataRequest("events/banner/create", params);
}
export async function serviceUpdateEventBanner(params) {
  return await formDataRequest("events/banner/update", params);
}
export async function serviceDeleteEventBanner(params) {
  return await postRequest("events/banner/delete", params);
}
export async function serviceGetEventBannerDetails(params) {
  return await postRequest("events/banner/detail", params);
}
export async function serviceGetEventBanner(params) {
  return await postRequest("events/banner", params);
}
export async function serviceDetailsEventBanner(params) {
  return await postRequest("events/banner/detail", params);
}
export async function serviceDetailsGetBannerList(params) {
    return await postRequest("events/banner/detail", params);
  }
