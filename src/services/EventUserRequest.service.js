import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateEventUserRequet(params) {
    return await formDataRequest("leads/create", params);
  }
  export async function serviceUpdateEventUserRequest(params) {
    return await postRequest("leads/update", params);
  }
  export async function serviceDeleteEventUserRequest(params) {
    return await postRequest("leads/delete", params);
  }
  export async function serviceGetEventUserRequestDetails(params) {
    return await postRequest("leads/details", params);
  }
  export async function serviceGetEventUserRequest(params) {
    return await postRequest("/leads/event", params);
  }
  export async function serviceDetailsEventUserRequest(params) {
    return await postRequest("leads/details", params);
  }
  export async function serviceAcceptEventUserRequest(params) {
    return await postRequest("leads/event/approve", params);
  }
  export async function serviceRejectEventUserRequest(params) {
    return await postRequest("leads/event/reject", params);
  }
  