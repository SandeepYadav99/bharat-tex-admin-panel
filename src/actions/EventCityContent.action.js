import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateEventCityContent,
  serviceGetEventCityContent,
  serviceUpdateEventCityContent,
  serviceDeleteEventCityContent,
} from "../services/EventCityContent.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_EVENT_ CONTENT";
export const FETCHED = "FETCHED_EVENT_ CONTENT";
export const FETCHED_FAIL = "FETCHED_FAIL_EVENT_ CONTENT";
export const FETCHED_FILTER = "FETCHED_FILTER_EVENT_ CONTENT";
export const FETCH_NEXT = "FETCH_NEXT_EVENT_ CONTENT";
export const FILTER = "FILTER_EVENT_ CONTENT";
export const RESET_FILTER = "RESET_FILTER_EVENT_ CONTENT";
export const SET_SORTING = "SET_SORTING_EVENT_ CONTENT";
export const SET_FILTER = "SET_FILTER_EVENT_ CONTENT";
export const SET_PAGE = "SET_PAGE_EVENT_ CONTENT";
export const CHANGE_PAGE = "CHANGE_PAGE_EVENT_ CONTENT";
export const CHANGE_STATUS = "CHANGE_STATE_EVENT_CONTENT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_EVENT_ CONTENT";
export const CREATE_DATA = "CREATE_EVENT_CONTENT";
export const UPDATE_DATA = "UPDATE_EVENT_CONTENT";
export const DELETE_ITEM = "DELETE_EVENT_CONTENT";

export function actionFetchEventCityContent(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetEventCityContent({
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

export function actionCreateEventCityContent(data) {
  const request = serviceCreateEventCityContent(data);
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

export function actionUpdateEventCityContent(data) {
  const request = serviceUpdateEventCityContent(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteEventCityContent(id) {
  const request = serviceDeleteEventCityContent({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageEventCityContent(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterEventCityContent(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusEventCityContent(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterEventCityContent() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEventCityContent(page) {
  const stateData = store.getState().event_city_content;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEventCityContent(serverPage + 1, sortingData, {
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
