import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateMemberList(params) {
    return await formDataRequest('members/create', params);
}
export async function serviceUpdateMemberList(params) {
    return await formDataRequest('members/update', params);
}
export async function serviceDeleteMemberList(params) {
    return await postRequest('members/delete', params);
}
export async function serviceGetMemberListDetails(params) {
    return await postRequest('member/claims/details', params);
}
export async function serviceGetMemberList(params) {
    return await postRequest('members', params);
}
export async function serviceDetailsMemberList(params) {
    return await postRequest('members/detail', params);
}
export async function serviceDetailsMemberChapter(params) {
    return await postRequest('members/chapters', params);
}
export async function serviceDetailsMemberUsers(params) {
    return await postRequest('members/users', params);
}
export async function serviceAddMemberUsers(params) {
    return await postRequest('members/users/add', params);
}
export async function serviceAddMemberChapterUsers(params) {
    return await postRequest('chapters/members/add', params);
}
export async function serviceUpdateMemberUsers(params) {
    return await postRequest('members/users/update', params);
}