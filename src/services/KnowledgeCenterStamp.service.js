import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateKnowledgeStampList(params) {
    return await formDataRequest("knowledge/center/stamp/create", params);
  }
  export async function serviceUpdateKnowledgeStampList(params) {
    return await formDataRequest("knowledge/center/stamp/update", params);
  }
  export async function serviceDeleteKnowledgeStampList(params) {
    return await postRequest("events/delete", params);
  }
  export async function serviceGetKnowledgeStampListDetails(params) {
    return await postRequest("knowledge/center/stamp/detail", params);
  }
  export async function serviceGetKnowledgeStampBoolsDetails(params) {
    return await postRequest("events/boolstatus", params);
  }
  export async function serviceUpdateKnowledgeStampTimer(params) {
    return await postRequest("events/update/timer", params);
  }
  export async function serviceUpdateKnowledgeStampStatus(params) {
    return await postRequest("events/update/status", params);
  }
  export async function serviceUpdateKnowledgeStampPoll(params) {
    return await postRequest("events/update/poll", params);
  }
  export async function serviceUpdateKnowledgeStampReg(params) {
    return await postRequest("events/update/registration", params);
  }
  
  export async function serviceGetKnowledgeStampList(params) {
    return await postRequest("knowledge/center/stamp", params);
  }
  export async function serviceDetailsKnowledgeStampList(params) {
    return await postRequest("events/details", params);
  }
  export async function serviceCheckKnowledgeStampList(params) {
    return await postRequest("events/exists", params);
  }
  