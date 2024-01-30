import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventGallery(params) {
  return await formDataRequest("events/albums/create", params);
}
export async function serviceUpdateEventGallery(params) {
  return await postRequest("events/albums/update", params);
}
export async function serviceDeleteEventGallery(params) {
  return await postRequest("events/albums/delete", params);
}
export async function serviceGetEventGalleryDetails(params) {
  return await postRequest("events/albums/detail", params);
}
export async function serviceGetEventGallery(params) {
  return await postRequest("events/albums", params);
}
export async function serviceDetailsEventGallery(params) {
  return await postRequest("events/albums/detail", params);
}
