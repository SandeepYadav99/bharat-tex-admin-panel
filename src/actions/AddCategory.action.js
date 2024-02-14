import store from "../store";
import Constants from "../config/constants";
import {serviceAddCategoryList} from '../services/AddCategory.service' 
import SnackbarUtils from "../libs/SnackbarUtils";
import { useSelector } from "react-redux";


export const FETCH_INIT = "FETCH_INIT_APP_USER";
export const FETCHED = "FETCHED_APP_USER";
export const FETCHED_FAIL = "FETCHED_FAIL_APP_USER";
export const FETCHED_FILTER = "FETCHED_FILTER_APP_USER";
export const FETCH_NEXT = "FETCH_NEXT_APP_USER";
export const FILTER = "FILTER_APP_USER";
export const RESET_FILTER = "RESET_FILTER_APP_USER";
export const SET_SORTING = "SET_SORTING_APP_USER";
export const SET_FILTER = "SET_FILTER_APP_USER";
export const SET_PAGE = "SET_PAGE_APP_USER";
export const CHANGE_PAGE = "CHANGE_PAGE_APP_USER";
export const CHANGE_STATUS = "CHANGE_STATE_APP_USER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_APP_USER";
export const CREATE_DATA = "CREATE_APP_USER";
export const UPDATE_DATA = "UPDATE_APP_USER";
export const DELETE_ITEM = "DELETE_APP_USER";
export const PROFILE_DETAILS = "PROFILE_DETAILS";
export const APP_USER_FEED_POST = "APP_USER_FEED_POST";
export const APP_USER_COMMENT = "APP_USER_COMMENT";
export const APP_USER_ASSOCIATE_CHAPTERS = "APP_USER_ASSOCIATE_CHAPTERS";
export const APP_USER_FEED_DELETE = "APP_USER_FEED_DELETE";
export const APP_USER_FEED_COMMENT_DELETE = "APP_USER_FEED_COMMENT_DELETE";
export const APP_USER_COMMENTS_BY_FEEDS = "APP_USER_COMMENTS_BY_FEEDS";
export const APP_USER_COMMENTS_INFO = "APP_USER_COMMENTS_INFO";


export function actionFetchCategory(
  index = 1,
  sorting = {},
  event_id={event_id},
  filter = {},
  shouldReset = false
) {
  
  const request = serviceAddCategoryList({
    index,
    event_id,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetCategory
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


export function actionChangePageCategory(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterCategory(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}


export function actionSetPageCategory(page) {
  const stateData = store.getState().category_reducer;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchCategory(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}










