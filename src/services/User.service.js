/**
 * Created by charnjeetelectrovese@gmail.com on 4/10/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateUser(params) {
    return await formDataRequest('users/create', params);
}

export async function serviceUpdateUser(params) {
    return await formDataRequest('users/update', params);
}

export async function serviceDeleteUser(params) {
    return await formDataRequest('users/delete', params);
}
export async function serviceGetUser (params) {
    return await postRequest('users', params);
}

export async function serviceGetUserList (params) {
    return await postRequest('users/list', params);
}

export async function serviceUserCheck (params) {
    return await postRequest('users/check', params);
}

export async function serviceUserManagerList (params) {
    return await postRequest('users/manager/list', params);
}

export async function serviceUserCountryList (params) {
    return await postRequest('users/country/list', params);
}
