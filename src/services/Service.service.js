import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateService(params) {
    return await postRequest('services/create', params);
}

export async function serviceUpdateService(params) {
    return await postRequest('services/update', params);
}

export async function serviceDeleteService(params) {
    return await postRequest('services/delete', params);
}

export async function serviceGetService (params) {
    return await postRequest('services', params);
}

// export async function serviceGetServiceList (params) {
//     return await getRequest('services', params);
// }

export async function serviceServiceCheck (params) {
    return await postRequest('services/exists', params);
}

