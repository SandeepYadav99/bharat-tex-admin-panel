import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetYoutubeStreem(params) {
    return await postRequest("events/youtube", params);
}

export async function serviceCreateYoutubeStreem(params) {
    return await postRequest("events/youtube/create", params);
}

export async function serviceUpdateYoutubeStreem(params) {
    return await postRequest("events/youtube/update/daf", params);
}

export async function serviceGetYoutubeStreem_Details(params) {
    return await postRequest("policies/detail", params);
}

export async function serviceYoutubeStreem_MarkActive(params) {
    return await postRequest("events/youtube/mark/active", params);
}

export async function serviceYoutubeStreem_MarkInactive(params) {
    return await postRequest("events/youtube/mark/inactive", params);
}


