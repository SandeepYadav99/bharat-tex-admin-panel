import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetProductCategory(params) {
    return await postRequest("product/category", params);
}

export async function serviceCreateProductCategory(params) {
    return await formDataRequest("product/category/create", params);
}

export async function serviceUpdateProductCategory(params) {
    return await formDataRequest("product/category/update", params);
}

export async function serviceGetProductCategoryDetails(params) {
    return await postRequest("product/category/detail", params);
}

export async function serviceDeleteProductCategory(params) {
    return await postRequest("policies/delete", params);
}
