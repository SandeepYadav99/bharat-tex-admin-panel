import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateReportedPost,
  serviceGetReportedPost,
  serviceUpdateReportedPost,
  serviceDeleteReportedPost,
  serviceReportedByPostData,
} from "../services/ReportedPost.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_REPORTED_POST";
export const FETCHED = "FETCHED_REPORTED_POST";
export const FETCHED_FAIL = "FETCHED_FAIL_REPORTED_POST";
export const FETCHED_FILTER = "FETCHED_FILTER_REPORTED_POST";
export const FETCH_NEXT = "FETCH_NEXT_REPORTED_POST";
export const FILTER = "FILTER_REPORTED_POST";
export const RESET_FILTER = "RESET_FILTER_REPORTED_POST";
export const SET_SORTING = "SET_SORTING_REPORTED_POST";
export const SET_FILTER = "SET_FILTER_REPORTED_POST";
export const SET_PAGE = "SET_PAGE_REPORTED_POST";
export const CHANGE_PAGE = "CHANGE_PAGE_REPORTED_POST";
export const CHANGE_STATUS = "CHANGE_STATE_REPORTED_POST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_REPORTED_POST";
export const CREATE_DATA = "CREATE_REPORTED_POST";
export const UPDATE_DATA = "UPDATE_REPORTED_POST";
export const DELETE_ITEM = "DELETE_REPORTED_POST";
export const REPORTED_BY_POST ="REPORTED_BY_POST";

export function actionFetchReportedPost(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetReportedPost({
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

export function actionCreateReportedPost(data) {
  const request = serviceCreateReportedPost(data);
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

export function actionReportedByPostData(data) {
  const request = serviceReportedByPostData(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: REPORTED_BY_POST, payload: data.data });
      }
    });
  };
}

export function actionUpdateReportedPost(data) {
  const request = serviceUpdateReportedPost(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteReportedPost(id) {
  const request = serviceDeleteReportedPost({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageReportedPost(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterReportedPost(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusReportedPost(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterReportedPost() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageReportedPost(page) {
  const stateData = store.getState().Reported_Post;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchReportedPost(serverPage + 1, sortingData, {
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




