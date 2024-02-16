import { postRequest } from "../libs/AxiosService.util";

export async function serviceCalendarCountList(params){
    return await postRequest("events/schedule/calendar/count", params);
}