import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateBusinessList,
  serviceGetBusinessList,
  serviceUpdateBusinessList,
  serviceDeleteBusinessList,
} from "../services/BusinessGreeting.service";
import EventEmitter from "../libs/Events.utils";
export const FETCH_INIT = "FETCH_INIT_BUSINESS_LIST";
export const FETCHED = "FETCHED_BUSINESS_LIST";
export const FETCHED_FAIL = "FETCHED_FAIL_BUSINESS_LIST";
export const FETCHED_FILTER = "FETCHED_FILTER_BUSINESS_LIST";
export const FETCH_NEXT = "FETCH_NEXT_BUSINESS_LIST";
export const FILTER = "FILTER_BUSINESS_LIST";
export const RESET_FILTER = "RESET_FILTER_BUSINESS_LIST";
export const SET_SORTING = "SET_SORTING_BUSINESS_LIST";
export const SET_FILTER = "SET_FILTER_BUSINESS_LIST";
export const SET_PAGE = "SET_PAGE_BUSINESS_LIST";
export const CHANGE_PAGE = "CHANGE_PAGE_BUSINESS_LIST";
export const CHANGE_STATUS = "CHANGE_STATE_BUSINESS_LIST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_BUSINESS_LIST";
export const CREATE_DATA = "CREATE_BUSINESS_LIST";
export const UPDATE_DATA = "UPDATE_BUSINESS_LIST";
export const DELETE_ITEM = "DELETE_BUSINESS_LIST";

export function actionFetchBusinessList(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetBusinessList({
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

export function actionCreateBusinessList(data) {
  const request = serviceCreateBusinessList(data);
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

export function actionUpdateBusinessList(data) {
  const request = serviceUpdateBusinessList(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteBusinessList(id) {
  const request = serviceDeleteBusinessList({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageBusinessList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterBusinessList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusBusinessList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterBusinessList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageBusinessList(page) {
  const stateData = store.getState().event_list;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchBusinessList(serverPage + 1, sortingData, {
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
