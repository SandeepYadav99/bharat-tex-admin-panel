import {postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCategory(params) {
    return await postRequest('categories/create', params);
}

export async function serviceUpdateCategory(params) {
    return await postRequest('categories/update', params);
}

// export async function serviceDeleteUnit(params) {
//     return await postRequest('units/delete', params);
// }

export async function serviceGetCategory (params) {
    return await postRequest('categories', params);
}

// export async function serviceGetUnitList (params) {
//     return await postRequest('units/list', params);
// }

// export async function serviceUnitCheck (params) {
//     return await postRequest('units/check', params);
// }

export async function serviceGetCategoryDetails(params) {
    return await postRequest('categories/detail', params);
}