import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetInfoCenter(params) {
    return await postRequest("events/information/center", params);
}

export async function serviceCreateInfoCenter(params) {
    return await formDataRequest("events/information/center/create", params);
}

export async function serviceUpdateInfoCenter(params) {
    return await formDataRequest("events/information/center/update", params);
}

export async function serviceGetInfoCenterDetails(params) {
    return await postRequest("events/information/center/detail", params);
}

export async function serviceDeleteInfoCenter(params) {
    return await postRequest("events/information/center/delete", params);
}
