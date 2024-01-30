import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateReportedComment,
  serviceGetReportedComment,
  serviceUpdateReportedComment,
  serviceDeleteReportedComment,
  serviceFeedsCoomentReportsDetailsValue,
} from "../services/ReportedComment.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_REPORTED_COMMENT";
export const FETCHED = "FETCHED_REPORTED_COMMENT";
export const FETCHED_FAIL = "FETCHED_FAIL_REPORTED_COMMENT";
export const FETCHED_FILTER = "FETCHED_FILTER_REPORTED_COMMENT";
export const FETCH_NEXT = "FETCH_NEXT_REPORTED_COMMENT";
export const FILTER = "FILTER_REPORTED_COMMENT";
export const RESET_FILTER = "RESET_FILTER_REPORTED_COMMENT";
export const SET_SORTING = "SET_SORTING_REPORTED_COMMENT";
export const SET_FILTER = "SET_FILTER_REPORTED_COMMENT";
export const SET_PAGE = "SET_PAGE_REPORTED_COMMENT";
export const CHANGE_PAGE = "CHANGE_PAGE_REPORTED_COMMENT";
export const CHANGE_STATUS = "CHANGE_STATE_REPORTED_COMMENT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_REPORTED_COMMENT";
export const CREATE_DATA = "CREATE_REPORTED_COMMENT";
export const UPDATE_DATA = "UPDATE_REPORTED_COMMENT";
export const DELETE_ITEM = "DELETE_REPORTED_COMMENT";
export const REPORTED_COMMENT_DETAIL_VIEW = "REPORTED_COMMENT_DETAIL_VIEW";

export function actionFetchReportedComment(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetReportedComment({
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



export function actionCreateReportedComment(data) {
  const request = serviceCreateReportedComment(data);
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

export function actionUpdateReportedCommentDataListValue(data) {
  const request = serviceFeedsCoomentReportsDetailsValue(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: REPORTED_COMMENT_DETAIL_VIEW, payload: data.data });
      }
    });
  };
}

export function actionUpdateReportedComment(data) {
  const request = serviceUpdateReportedComment(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteReportedComment(id) {
  const request = serviceDeleteReportedComment({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageReportedComment(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterReportedComment(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusReportedComment(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterReportedComment() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageReportedComment(page) {
  const stateData = store.getState().Reported_Comment;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchReportedComment(serverPage + 1, sortingData, {
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
