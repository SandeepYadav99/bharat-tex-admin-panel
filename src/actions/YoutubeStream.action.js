import store from "../store";
import Constants from "../config/constants";
import { serviceCreateYoutubeStreem, serviceGetYoutubeStreem, serviceUpdateYoutubeStreem } from "../services/YoutubeStreem.service";

export const FETCH_INIT = "FETCH_INIT_YOUTUBE_STREEM";
export const FETCHED = "FETCHED_YOUTUBE_STREEM";
export const FETCHED_FAIL = "FETCHED_FAIL_YOUTUBE_STREEM";
export const FETCHED_FILTER = "FETCHED_FILTER_YOUTUBE_STREEM";
export const FETCH_NEXT = "FETCH_NEXT_YOUTUBE_STREEM";
export const FILTER = "FILTER_YOUTUBE_STREEM";
export const RESET_FILTER = "RESET_FILTER_YOUTUBE_STREEM";
export const SET_SORTING = "SET_SORTING_YOUTUBE_STREEM";
export const SET_FILTER = "SET_FILTER_YOUTUBE_STREEM";
export const SET_PAGE = "SET_PAGE_YOUTUBE_STREEM";
export const CHANGE_PAGE = "CHANGE_PAGE_YOUTUBE_STREEM";
export const CHANGE_STATUS = "CHANGE_STATE_YOUTUBE_STREEM";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_YOUTUBE_STREEM";
export const CREATE_DATA = "CREATE_YOUTUBE_STREEM";
export const UPDATE_DATA = "UPDATE_YOUTUBE_STREEM";
export const DELETE_ITEM = "DELETE_YOUTUBE_STREEM";

export function actionFetchYoutubeStreem(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetYoutubeStreem({
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

export function actionCreateYoutubeStreem(data) {
  
  const request = serviceCreateYoutubeStreem(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateYoutubeStreem(data) {
  const request = serviceUpdateYoutubeStreem(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteYoutubeStreem(id) {
//   const request = serviceDeleteYoutubeStreem({ id: id });
//   return (dispatch) => {
//     dispatch({ type: DELETE_ITEM, payload: id });
//   };
}

export function actionChangePageAdminUser(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterYoutubeStreem(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusYoutubeStreem(id, status) {
  //const request = serviceUpdateAdminUser({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterYoutubeStreem() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageYoutubeStreem(page) {
  const stateData = store.getState().YoutubeStreem;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchYoutubeStreem(serverPage + 1, sortingData, {
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
