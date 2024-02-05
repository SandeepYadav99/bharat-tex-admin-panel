import { formDataRequest, postRequest } from "../libs/AxiosService.util";


export async function serviceCreateExhibitors(params) {
  return await formDataRequest("exhibitors/createS", params);
}
export async function serviceUpdateExhibitors(params) {
  return await formDataRequest("exhibitors/updateS", params);
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

export async  function serviceExhibitorsList(params) {
  return await postRequest("list", params);
}

export async function serviceGetProductList(){
  return await postRequest("product/group/tages")
}



