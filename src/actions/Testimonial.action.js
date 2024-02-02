import store from "../store";
import Constants from "../config/constants";
import { serviceCreateTestimonial, serviceGetTestimonial, serviceUpdateTestimonial } from "../services/Testimonial.service";


export const FETCH_INIT = "FETCH_INIT_TESTIMONIAL";
export const FETCHED = "FETCHED_TESTIMONIAL";
export const FETCHED_FAIL = "FETCHED_FAIL_TESTIMONIAL";
export const FETCHED_FILTER = "FETCHED_FILTER_TESTIMONIAL";
export const FETCH_NEXT = "FETCH_NEXT_TESTIMONIAL";
export const FILTER = "FILTER_TESTIMONIAL";
export const RESET_FILTER = "RESET_FILTER_TESTIMONIAL";
export const SET_SORTING = "SET_SORTING_TESTIMONIAL";
export const SET_FILTER = "SET_FILTER_TESTIMONIAL";
export const SET_PAGE = "SET_PAGE_TESTIMONIAL";
export const CHANGE_PAGE = "CHANGE_PAGE_TESTIMONIAL";
export const CHANGE_STATUS = "CHANGE_STATE_TESTIMONIAL";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_TESTIMONIAL";
export const CREATE_DATA = "CREATE_TESTIMONIAL";
export const UPDATE_DATA = "UPDATE_TESTIMONIAL";
export const DELETE_ITEM = "DELETE_TESTIMONIAL";

export function actionFetchTestimonial(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetTestimonial({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetAdminUser
  return (dispatch) => {
    if (shouldReset) {
      dispatch({
        type: CHANGE_PAGE,
        payload: 1,
      });
    }
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (!data.error) {
        dispatch({ type: FETCHED, payload: { data: data?.data, page: index } });
        dispatch({ type: SET_SERVER_PAGE, payload: index });
        if (index == 1) {
          dispatch({ type: CHANGE_PAGE, payload: index - 1 });
        }
      } else {
        dispatch({ type: FETCHED_FAIL, payload: null });
      }
    });
  };
}

export function actionCreateTestimonial(data) {
  const request = serviceCreateTestimonial(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateTestimonial(data) {
  const request = serviceUpdateTestimonial(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteTestimonial(id) {
  // const request = serviceDeleteTestimonial({ id: id });
  // return (dispatch) => {
  //   dispatch({ type: DELETE_ITEM, payload: id });
  // };
}

export function actionChangePageAdminUser(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterTestimonial(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusTestimonial(id, status) {
  //const request = serviceUpdateAdminUser({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterTestimonial() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageTestimonial(page) {
  const stateData = store.getState().testimonial;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchTestimonial(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
