import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateLeadMemberList(params) {
  return await formDataRequest("leads/create", params);
}
export async function serviceUpdateLeadMemberList(params) {
  return await postRequest("leads/update", params);
}
export async function serviceDeleteLeadMemberList(params) {
  return await postRequest("leads/delete", params);
}
export async function serviceGetLeadMemberListDetails(params) {
  return await postRequest("leads/details", params);
}
export async function serviceGetLeadMemberList(params) {
  return await postRequest("leads", params);
}
export async function serviceDetailsLeadMemberList(params) {
  return await postRequest("leads/details", params);
}
export async function serviceAcceptLeadMemberList(params) {
  return await postRequest("leads/approve", params);
}
export async function serviceRejectLeadMemberList(params) {
  return await postRequest("leads/reject", params);
}
