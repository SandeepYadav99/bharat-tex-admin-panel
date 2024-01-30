import { formDataRequest ,postRequest} from "../libs/AxiosService.util";

export async function serviceSendNotifications(params) {
  return await formDataRequest("notifications/send", params);
}
export async function serviceCreateNotification(params) {
  return await formDataRequest("notifications/create", params);
}
export async function serviceUpdateNotification(params) {
  return await postRequest("notifications/update", params);
}
export async function serviceDeleteNotification(params) {
  return await postRequest("notifications/delete", params);
}
export async function serviceGetNotificationDetails(params) {
  return await postRequest("notifications/detail", params);
}
export async function serviceGetNotification(params) {
  return await postRequest("notifications", params);
}
export async function serviceDetailsNotification(params) {
  return await postRequest("notifications/detail", params);
}
export async function serviceNotificationCheck(params) {
  return await postRequest("notificationsories/exists", params);
}
