/**
 * Created by charnjeetelectrovese@gmail.com on 4/10/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateProviderUser(params) {
    return await formDataRequest('users/create', params);
}

export async function serviceUpdateProviderUser(params) {
    return await formDataRequest('users/update', params);
}

export async function serviceDeleteProviderUser(params) {
    return await formDataRequest('users/delete', params);
}
export async function serviceGetProviderUser (params) {
    return await postRequest('users', params);
}

export async function serviceGetProviderUserList (params) {
    return await postRequest('users/list', params);
}

export async function serviceProviderUserCheck (params) {
    return await postRequest('users/check', params);
}

export async function serviceGetCustomerDetail(params) {
    return await postRequest('users/detail', params);
}
