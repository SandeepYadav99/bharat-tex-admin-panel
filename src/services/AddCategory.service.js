import {  postRequest } from "../libs/AxiosService.util";


export async function serviceCreateCategory(params) {
    return await postRequest("events/schedule/categories/create", params);
}

export async function serviceAddCategoryList(params){
    return await postRequest("events/schedule/categories", params);
}
export async function serviceAddCategoryDetails(params){
    return await postRequest("events/schedule/categories/detail", params);
}

export async function serviceUpdateCategory(params) {
    return await postRequest("events/schedule/categories/update", params);
}


