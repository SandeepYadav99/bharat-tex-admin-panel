import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetHallMasterList(params) {
    return await postRequest("policies", params);
}

export async function serviceCreateHallMasterList(params) {
    return await formDataRequest("policies/create", params);
}

export async function serviceUpdateHallMasterList(params) {
    return await formDataRequest("policies/update", params);
}

export async function serviceGetHallMasterDetails(params) {
    return await postRequest("policies/detail", params);
}

export async function serviceDeleteHallMasterList(params) {
    return await postRequest("policies/delete", params);
}
