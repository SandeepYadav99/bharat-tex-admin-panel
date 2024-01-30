import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventCityGuide(params) {
  return await formDataRequest("events/city/guides/create", params);
}
export async function serviceUpdateEventCityGuide(params) {
  return await formDataRequest("events/city/guides/update", params);
}
export async function serviceDeleteEventCityGuide(params) {
  return await postRequest("events/city/guides/delete", params);
}
export async function serviceGetEventCityGuideDetails(params) {
  return await postRequest("events/city/guides/detail", params);
}
export async function serviceGetEventCityGuide(params) {
  return await postRequest("events/city/guides", params);
}
export async function serviceDetailsEventCityGuide(params) {
  return await postRequest("events/city/guides/detail", params);
}
export async function serviceCreateEventCityGuideBanner(params) {
  return await formDataRequest("events/city/guide/banner/update", params);
}
export async function serviceDetailEventCityGuideBanner(params) {
  return await formDataRequest("events/city/guide/banner", params);
}