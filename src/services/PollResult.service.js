import {formDataRequestWithoutAuthentication} from '../libs/AxiosService.util';


export async function servicesCreatePollResult(params) {
    return await formDataRequestWithoutAuthentication('events/polls/result', params);
}