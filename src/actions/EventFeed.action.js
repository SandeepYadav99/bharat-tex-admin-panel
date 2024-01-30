import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateEventFeed,
  serviceGetEventFeed,
  serviceUpdateEventFeed,
  serviceDeleteEventFeed,
} from "../services/EventFeed.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_EVENT_FEED";
export const FETCHED = "FETCHED_EVENT_FEED";
export const FETCHED_FAIL = "FETCHED_FAIL_EVENT_FEED";
export const FETCHED_FILTER = "FETCHED_FILTER_EVENT_FEED";
export const FETCH_NEXT = "FETCH_NEXT_EVENT_FEED";
export const FILTER = "FILTER_EVENT_FEED";
export const RESET_FILTER = "RESET_FILTER_EVENT_FEED";
export const SET_SORTING = "SET_SORTING_EVENT_FEED";
export const SET_FILTER = "SET_FILTER_EVENT_FEED";
export const SET_PAGE = "SET_PAGE_EVENT_FEED";
export const CHANGE_PAGE = "CHANGE_PAGE_EVENT_FEED";
export const CHANGE_STATUS = "CHANGE_STATE_EVENT_FEED";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_EVENT_FEED";
export const CREATE_DATA = "CREATE_EVENT_FEED";
export const UPDATE_DATA = "UPDATE_EVENT_FEED";
export const DELETE_ITEM = "DELETE_EVENT_FEED";

export function actionFetchEventFeed(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetEventFeed({
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

export function actionCreateEventFeed(data) {
  const request = serviceCreateEventFeed(data);
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

export function actionUpdateEventFeed(data) {
  const request = serviceUpdateEventFeed(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteEventFeed(id) {
  const request = serviceDeleteEventFeed({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageEventFeed(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterEventFeed(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusEventFeed(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterEventFeed() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEventFeed(page) {
  const stateData = store.getState().event_feed;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEventFeed(serverPage + 1, sortingData, {
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
