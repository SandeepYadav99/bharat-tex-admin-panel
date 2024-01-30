/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */
import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetSupport(params) {
    return await postRequest('support', params);
}

export async function serviceCreateSupport(params) {
    return await postRequest('support/create', params);
}

export async function serviceUpdateSupport(params) {
    return await postRequest('support/update', params);
}


export async function serviceGetSupportDetail(params) {
    return await postRequest('support/detail', params);
}

export async function serviceGetSupportNotes(params) {
    return await postRequest('support/notes', params);
}

export async function serviceChangeSupportStatus(params) {
    return await postRequest('support/change/status', params);
}

export async function serviceChangeSupportPriority(params) {
    return await postRequest('support/change/priority', params);
}

export async function serviceChangeSupportConcern(params) {
    return await postRequest('support/change/concern', params);
}

export async function serviceAddSupportNote(params) {
    return await postRequest('support/notes/create', params);
}

export async function serviceAssignUserToSupport(params) {
    return await postRequest('support/assign/user', params);
}

export async function serviceGetSupportUsers(params) {
    return await getRequest('list/admin/users', params);
}

export async function serviceGetSupportTimeline(params) {
    return await postRequest('support/timeline', params);
}
