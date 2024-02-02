import { formDataRequest, postRequest } from "../libs/AxiosService.util";


export async function serviceCreateExhibitors(params) {
  return await formDataRequest("exhibitors/create", params);
}
export async function serviceUpdateExhibitors(params) {
  return await formDataRequest("exhibitors/update", params);
}

export async function serviceGetExhibitorsDetails(params) {
  return await postRequest("exhibitors/detail", params);
}
export async function serviceGetExhibitors(params) {
  return await postRequest("exhibitors", params);
}
export async function serviceDeleteExhibitors(params) {
  return await postRequest("exhibitors", params);
}



