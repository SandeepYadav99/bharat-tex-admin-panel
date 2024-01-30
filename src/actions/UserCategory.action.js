import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateEventCategory,
  serviceGetEventCategory,
  serviceUpdateEventCategory,
  serviceDeleteEventCategory,
} from "../services/EventCategory.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_USER_CATEGORY";
export const FETCHED = "FETCHED_USER_CATEGORY";
export const FETCHED_FAIL = "FETCHED_FAIL_USER_CATEGORY";
export const FETCHED_FILTER = "FETCHED_FILTER_USER_CATEGORY";
export const FETCH_NEXT = "FETCH_NEXT_USER_CATEGORY";
export const FILTER = "FILTER_USER_CATEGORY";
export const RESET_FILTER = "RESET_FILTER_USER_CATEGORY";
export const SET_SORTING = "SET_SORTING_USER_CATEGORY";
export const SET_FILTER = "SET_FILTER_USER_CATEGORY";
export const SET_PAGE = "SET_PAGE_USER_CATEGORY";
export const CHANGE_PAGE = "CHANGE_PAGE_USER_CATEGORY";
export const CHANGE_STATUS = "CHANGE_STATE_USER_CATEGORY";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_USER_CATEGORY";
export const CREATE_DATA = "CREATE_USER_CATEGORY";
export const UPDATE_DATA = "UPDATE_USER_CATEGORY";
export const DELETE_ITEM = "DELETE_USER_CATEGORY";

export function actionFetchEventCategory(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetEventCategory({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  });
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (!data.error) {
        dispatch({ type: FETCHED, payload: { data: data.data, page: index } });
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

export function actionCreateEventCategory(data) {
  const request = serviceCreateEventCategory(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Saved",
          type: "success",
        });
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateEventCategory(data) {
  const request = serviceUpdateEventCategory(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteEventCategory(id) {
  const request = serviceDeleteEventCategory({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageEventCategory(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterEventCategory(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusEventCategory(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterEventCategory() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEventCategory(page) {
  const stateData = store.getState().event_category;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEventCategory(serverPage + 1, sortingData, {
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
