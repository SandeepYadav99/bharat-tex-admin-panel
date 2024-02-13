import {  postRequest } from "../libs/AxiosService.util";


export async function serviceCreateCategory(params) {
    return await postRequest("events/schedule/categories/create", params);
}