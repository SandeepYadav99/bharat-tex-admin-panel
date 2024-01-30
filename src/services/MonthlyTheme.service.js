import {formDataRequest, postRequest} from "../libs/AxiosService.util";

export async function serviceGetMonthlyThemes(params) {
    return await postRequest('monthly/themes', params);
}

export async function serviceUpdateMonthlyTheme(params) {
    return await formDataRequest('monthly/themes/update', params);
}
