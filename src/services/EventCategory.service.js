import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventCategory(params) {
  return await formDataRequest("events/help/desk/users/create", params);
}
export async function serviceUpdateEventCategory(params) {
  return await postRequest("events/help/desk/users/update", params);
}
export async function serviceDeleteEventCategory(params) {
  return await postRequest("events/help/desk/users/delete", params);
}
export async function serviceGetEventCategoryDetails(params) {
  return await postRequest("events/help/desk/users/detail", params);
}
export async function serviceGetEventCategory(params) {
  return await postRequest("events/help/desk/users", params);
}
export async function serviceDetailsEventCategory(params) {
  return await postRequest("events/help/desk/users/detail", params);
}
export async function serviceEventCategoryCheck(params) {
  return await postRequest("events/help/desk/categories/exists", params);
}

