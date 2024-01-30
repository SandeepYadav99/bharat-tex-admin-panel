import {postRequest} from "../libs/AxiosService.util";

export async function serviceCreateDispatch(params) {
    return await postRequest('dispatch/create', params);
}

export async function serviceGetPendingDispatches(params) {
    return await postRequest('dispatch/pending/list', params);
}

export async function serviceDispatchAwb(params) {
    return await postRequest('dispatch/awb', params);
}
