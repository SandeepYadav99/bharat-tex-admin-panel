import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetExhibitorsQuery(params) {
    return await postRequest("exhibitors/queries", params);
}