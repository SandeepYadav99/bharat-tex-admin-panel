import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateEventUser,
  serviceGetEventUser,
  serviceUpdateEventUser,
  serviceDeleteEventUser,
} from "../services/EventUser.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_USER_LIST";
export const FETCHED = "FETCHED_USER_LIST";
export const FETCHED_FAIL = "FETCHED_FAIL_USER_LIST";
export const FETCHED_FILTER = "FETCHED_FILTER_USER_LIST";
export const FETCH_NEXT = "FETCH_NEXT_USER_LIST";
export const FILTER = "FILTER_USER_LIST";
export const RESET_FILTER = "RESET_FILTER_USER_LIST";
export const SET_SORTING = "SET_SORTING_USER_LIST";
export const SET_FILTER = "SET_FILTER_USER_LIST";
export const SET_PAGE = "SET_PAGE_USER_LIST";
export const CHANGE_PAGE = "CHANGE_PAGE_USER_LIST";
export const CHANGE_STATUS = "CHANGE_STATE_USER_LIST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_USER_LIST";
export const CREATE_DATA = "CREATE_USER_LIST";
export const UPDATE_DATA = "UPDATE_USER_LIST";
export const DELETE_ITEM = "DELETE_USER_LIST";

export function actionFetchEventUser(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetEventUser({
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

export function actionCreateEventUser(data) {
  const request = serviceCreateEventUser(data);
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

export function actionUpdateEventUser(data) {
  const request = serviceUpdateEventUser(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteEventUser(id) {
  const request = serviceDeleteEventUser({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageEventUser(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterEventUser(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusEventUser(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterEventUser() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEventUser(page) {
  const stateData = store.getState().event_user;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEventUser(serverPage + 1, sortingData, {
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
