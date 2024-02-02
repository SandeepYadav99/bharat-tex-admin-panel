import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateExhibitorList(params) {
    return await formDataRequest("/exhibitors", params);
  }
  export async function serviceUpdateExhibitorList(params) {
    return await formDataRequest("/exhibitors", params);
  }
  export async function serviceDeleteExhibitorList(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceGetExhibitorListDetails(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceGetExhibitorBoolsDetails(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceUpdateExhibitorTimer(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceUpdateExhibitorStatus(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceUpdateExhibitorPoll(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceUpdateExhibitorReg(params) {
    return await postRequest("/exhibitors", params);
  }
  
  export async function serviceGetExhibitorList(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceDetailsExhibitorList(params) {
    return await postRequest("/exhibitors", params);
  }
  export async function serviceCheckExhibitorList(params) {
    return await postRequest("/exhibitors", params);
  }
  
  
  