import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventPolls(params) {
  return await formDataRequest("events/polls/create", params);
}
export async function serviceUpdateEventPolls(params) {
  return await postRequest("events/polls/update", params);
}
export async function serviceDeleteEventPolls(params) {
  return await postRequest("events/polls/delete", params);
}
export async function serviceGetEventPollsDetails(params) {
  return await postRequest("events/polls/detail", params);
}
export async function serviceGetEventPolls(params) {
  return await postRequest("events/polls", params);
}
export async function serviceDetailsEventPolls(params) {
  return await postRequest("events/polls/detail", params);
}
