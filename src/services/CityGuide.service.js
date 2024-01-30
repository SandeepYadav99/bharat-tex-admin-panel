import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateCityGuideList(params) {
    return await formDataRequest("events/city/guides/create", params);
  }

  export async function serviceUpdateCityGuideList(params) {
    return await postRequest("/events/city/guides/update", params);
  }

  export async function serviceUpdateCityGuideBannerList(params) {
    return await postRequest("/events/city/guide/banner/update", params);
  }

  export async function serviceDeleteCityGuideList(params) {
    return await postRequest("events/delete", params);
  }

  export async function serviceGetCityGuideList(params) {
    return await postRequest("/events/city/guides", params);
  }

  export async function serviceGetCityGuideListDetails(params) {
    return await postRequest("events/city/guides/detail", params);
  }

  export async function serviceGetCityGuideBanner(params) {
    return await postRequest("/events/city/guide/banner", params);
  }

