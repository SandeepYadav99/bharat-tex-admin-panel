import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateCityGuideContent(params) {
    return await formDataRequest("events/city/guide/contents/create", params);
  }

  export async function serviceUpdateCityGuideContent(params) {
    return await postRequest("events/city/guide/contents/update", params);
  }

  export async function serviceDeleteCityGuideContent(params) {
    return await postRequest("events/delete", params);
  }


  export async function serviceGetCityGuideContentDetails(params) {
    return await postRequest("events/city/guide/contents/detail", params);
  }

 

