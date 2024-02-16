/**
 * Created by charnjeetelectrovese@gmail.com on 1/22/2020.
 */
import {formDataRequest, getRequest, postRequest} from "../libs/AxiosService.util";

export async function serviceGetCustomList(list, otherParams = {}) {
    return await postRequest('list/custom', {list: list, ...otherParams});
}

export async function serviceGetKeywords() {
    return await postRequest('keywords', {});
}

export async function serviceGetVendorsList() {
    return await getRequest('/vendors/list');
}

export async function serviceGetList(list, otherParams = {}) {
    return await postRequest('list', { list: list, ...otherParams });
}


export async function serviceUploadImage(params) {
    return await formDataRequest("upload/image", params);
}
