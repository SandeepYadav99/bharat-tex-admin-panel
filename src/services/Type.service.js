import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateType(params) {
    return await postRequest('type/create', params);
}

export async function serviceUpdateType(params) {
    return await postRequest('type/update', params);
}

export async function serviceDeleteType(params) {
    return await postRequest('type/delete', params);
}

export async function serviceGetType (params) {
    return await postRequest('type', params);
}

export async function serviceGetTypeList (params) {
    return await getRequest('types', params);
}

export async function serviceTypeCheck (params) {
    return await postRequest('type/check', params);
}

