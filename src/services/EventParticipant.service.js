import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateEventParticipant(params) {
  return await formDataRequest("events/participants/create", params);
}
export async function serviceGetEventParticipantDetails(params) {
  return await postRequest("events/participants/detail", params);
}

export async function serviceUpdateEventParticipant(params) {
  return await postRequest("events/participants/update", params);
}

export async function serviceResetPasswordEventParticipant(params) {
  return await postRequest('events/participants/reset/password', params);
}
export async function serviceUpdateEventParticipantSearch(params) {
  return await postRequest("events/participants/autocomplete", params);
}
export async function serviceDeleteEventParticipant(params) {
  return await postRequest("events/participants/delete", params);
}

export async function serviceGetEventParticipant(params) {
  return await postRequest("events/participants", params);
}

export async function serviceEventParticipantCheck(params) {
  return await postRequest("events/participants/check", params);
}

export async function serviceEventParticipantUpdateHead(params) {
  return await postRequest("events/participants/update/head", params);
}

export async function serviceEventParticipantUpdate(params) {
  return await postRequest("events/participants/update/users", params);
}

export async function serviceEventParticipants(params) {
  return await postRequest("events/participants/users", params);
}
export async function serviceClaimEventParticipants(params) {
  return await postRequest("events/participants/claim/panelists", params);
}
export async function serviceEventParticipantClaimUpdate(params) {
  return await postRequest("events/participants/update/claim/panelists", params);
}
