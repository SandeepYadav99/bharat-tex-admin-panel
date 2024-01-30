import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateEventParticipant,
  serviceDeleteEventParticipant,
  serviceGetEventParticipant,
  serviceUpdateEventParticipant,
} from "../services/EventParticipant.service";

export const FETCH_INIT = "FETCH_INIT_EVENT_PARTICIPANT";
export const FETCHED = "FETCHED_EVENT_PARTICIPANT";
export const FETCHED_FAIL = "FETCHED_FAIL_EVENT_PARTICIPANT";
export const FETCHED_FILTER = "FETCHED_FILTER_EVENT_PARTICIPANT";
export const FETCH_NEXT = "FETCH_NEXT_EVENT_PARTICIPANT";
export const FILTER = "FILTER_EVENT_PARTICIPANT";
export const RESET_FILTER = "RESET_FILTER_EVENT_PARTICIPANT";
export const SET_SORTING = "SET_SORTING_EVENT_PARTICIPANT";
export const SET_FILTER = "SET_FILTER_EVENT_PARTICIPANT";
export const SET_PAGE = "SET_PAGE_EVENT_PARTICIPANT";
export const CHANGE_PAGE = "CHANGE_PAGE_EVENT_PARTICIPANT";
export const CHANGE_STATUS = "CHANGE_STATE_EVENT_PARTICIPANT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_EVENT_PARTICIPANT";
export const CREATE_DATA = "CREATE_EVENT_PARTICIPANT";
export const UPDATE_DATA = "UPDATE_EVENT_PARTICIPANT";
export const DELETE_ITEM = "DELETE_EVENT_PARTICIPANT";

export function actionFetchEventParticipant(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false,

) {
  const request = serviceGetEventParticipant({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetEventParticipant
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

export function actionCreateEventParticipant(data) {
  const request = serviceCreateEventParticipant(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateEventParticipant(data) {
  const request = serviceUpdateEventParticipant(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteEventParticipant(id) {
  const request = serviceDeleteEventParticipant({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageEventParticipant(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterEventParticipant(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusEventParticipant(id, status) {
  //const request = serviceUpdateEventParticipant({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterEventParticipant() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEventParticipant(page) {
  const stateData = store.getState().eventParticipant;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEventParticipant(serverPage + 1, sortingData, {
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
