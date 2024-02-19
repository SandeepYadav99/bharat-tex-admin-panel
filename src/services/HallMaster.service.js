import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetHallMasterList(params) {
    return await postRequest("halls", params);
}

export async function serviceCreateHallMasterList(params) {
    return await formDataRequest("halls/create", params);
}

export async function serviceUpdateHallMasterList(params) {
    return await formDataRequest("halls/update", params);
}

export async function serviceGetHallMasterDetails(params) {
    return await postRequest("halls/detail", params);
}

export async function serviceDeleteHallMasterList(params) {
    return await postRequest("halls/delete", params);
}
