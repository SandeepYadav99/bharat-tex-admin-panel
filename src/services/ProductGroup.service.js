import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetProductGroup(params) {
    return await postRequest("product/group", params);
}

export async function serviceCreateProductGroup(params) {
    return await formDataRequest("product/group/create", params);
}

export async function serviceUpdateProductGroup(params) {
    return await formDataRequest("product/group/update", params);
}

export async function serviceGetProductGroupDetails(params) {
    return await postRequest("product/group/detail", params);
}

export async function serviceDeleteProductGroup(params) {
    return await postRequest("policies/delete", params);
}
