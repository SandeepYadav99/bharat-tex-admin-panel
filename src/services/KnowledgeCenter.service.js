import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateKnowledgeList(params) {
    return await formDataRequest("knowledge/center/create", params);
  }
  export async function serviceUpdateKnowledgeList(params) {
    return await formDataRequest("knowledge/center/update", params);
  }
  export async function serviceDeleteKnowledgeList(params) {
    return await postRequest("events/delete", params);
  }
  export async function serviceGetKnowledgeListDetails(params) {
    return await postRequest("knowledge/center/detail", params);
  }
  export async function serviceGetKnowledgeBoolsDetails(params) {
    return await postRequest("events/boolstatus", params);
  }
  export async function serviceUpdateKnowledgeTimer(params) {
    return await postRequest("events/update/timer", params);
  }
  export async function serviceUpdateKnowledgeStatus(params) {
    return await postRequest("events/update/status", params);
  }
  export async function serviceUpdateKnowledgePoll(params) {
    return await postRequest("events/update/poll", params);
  }
  export async function serviceUpdateKnowledgeReg(params) {
    return await postRequest("events/update/registration", params);
  }
  
  export async function serviceGetKnowledgeList(params) {
    return await postRequest("knowledge/center", params);
  }
  export async function serviceDetailsKnowledgeList(params) {
    return await postRequest("events/details", params);
  }
  export async function serviceCheckKnowledgeList(params) {
    return await postRequest("events/exists", params);
  }
  