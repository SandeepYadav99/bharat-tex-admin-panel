import {  postRequest } from "../libs/AxiosService.util";


export async function serviceCreateCategory(params) {
    return await postRequest("events/schedule/categories/create", params);
}

export async function serviceAddCategoryList(params){
    return await postRequest("events/schedule/categories", params);

}