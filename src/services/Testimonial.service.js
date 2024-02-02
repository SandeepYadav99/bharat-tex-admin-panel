import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetTestimonial(params) {
    return await postRequest("events/testimonial", params);
}

export async function serviceCreateTestimonial(params) {
    return await formDataRequest("events/testimonial/create", params);
}

export async function serviceUpdateTestimonial(params) {
    return await formDataRequest("events/testimonial/update", params);
}

export async function serviceGetTestimonialDetails(params) {
    return await postRequest("events/testimonial/detail", params);
}

export async function serviceDeleteTestimonial(params) {
    return await postRequest("events/testimonial/delete", params);
}
