import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateStateMember,
  serviceGetStateMember,
  serviceUpdateStateMember,
  serviceDeleteStateMember,
} from "../services/StateMember.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_STATE_MEMBER";
export const FETCHED = "FETCHED_STATE_MEMBER";
export const FETCHED_FAIL = "FETCHED_FAIL_STATE_MEMBER";
export const FETCHED_FILTER = "FETCHED_FILTER_STATE_MEMBER";
export const FETCH_NEXT = "FETCH_NEXT_STATE_MEMBER";
export const FILTER = "FILTER_STATE_MEMBER";
export const RESET_FILTER = "RESET_FILTER_STATE_MEMBER";
export const SET_SORTING = "SET_SORTING_STATE_MEMBER";
export const SET_FILTER = "SET_FILTER_STATE_MEMBER";
export const SET_PAGE = "SET_PAGE_STATE_MEMBER";
export const CHANGE_PAGE = "CHANGE_PAGE_STATE_MEMBER";
export const CHANGE_STATUS = "CHANGE_STATE_STATE_MEMBER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_STATE_MEMBER";
export const CREATE_DATA = "CREATE_STATE_MEMBER";
export const UPDATE_DATA = "UPDATE_STATE_MEMBER";
export const DELETE_ITEM = "DELETE_STATE_MEMBER";

export function actionFetchStateMember(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetStateMember({
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
        dispatch({ type: FETCHED, payload: { data: data.data?.memberUser, page: index,memberChapterCount:data?.data?.memberChapterCount } });
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

export function actionCreateStateMember(data) {
  const request = serviceCreateStateMember(data);
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

export function actionUpdateStateMember(data) {
  const request = serviceUpdateStateMember(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteStateMember(id) {
  const request = serviceDeleteStateMember({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageStateMember(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterStateMember(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusStateMember(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterStateMember() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageStateMember(page) {
  const stateData = store.getState().state_member_list;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchStateMember(serverPage + 1, sortingData, {
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
