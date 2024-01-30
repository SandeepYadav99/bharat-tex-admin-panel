import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetAlbumList(params) {
    return await postRequest("albums", params);
}

export async function serviceCreateAlbumList(params) {
    return await formDataRequest("albums/create", params);
}

export async function serviceUpdateAlbumList(params) {
    return await formDataRequest("albums/update", params);
}

export async function serviceGetAlbumDetails(params) {
    return await postRequest("albums/detail", params);
}

export async function serviceDeleteAlbumList(params) {
    return await postRequest("policies/delete", params);
}
