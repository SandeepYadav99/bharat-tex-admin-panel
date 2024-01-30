import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateLeadMemberList,
  serviceGetLeadMemberList,
  serviceUpdateLeadMemberList,
  serviceDeleteLeadMemberList,
} from "../services/LeadMemberList.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_LEAD_MEMBER_LIST";
export const FETCHED = "FETCHED_LEAD_MEMBER_LIST";
export const FETCHED_FAIL = "FETCHED_FAIL_LEAD_MEMBER_LIST";
export const FETCHED_FILTER = "FETCHED_FILTER_LEAD_MEMBER_LIST";
export const FETCH_NEXT = "FETCH_NEXT_LEAD_MEMBER_LIST";
export const FILTER = "FILTER_LEAD_MEMBER_LIST";
export const RESET_FILTER = "RESET_FILTER_LEAD_MEMBER_LIST";
export const SET_SORTING = "SET_SORTING_LEAD_MEMBER_LIST";
export const SET_FILTER = "SET_FILTER_LEAD_MEMBER_LIST";
export const SET_PAGE = "SET_PAGE_LEAD_MEMBER_LIST";
export const CHANGE_PAGE = "CHANGE_PAGE_LEAD_MEMBER_LIST";
export const CHANGE_STATUS = "CHANGE_STATE_LEAD_MEMBER_LIST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_LEAD_MEMBER_LIST";
export const CREATE_DATA = "CREATE_LEAD_MEMBER_LIST";
export const UPDATE_DATA = "UPDATE_LEAD_MEMBER_LIST";
export const DELETE_ITEM = "DELETE_LEAD_MEMBER_LIST";

export function actionFetchLeadMemberList(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetLeadMemberList({
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

export function actionCreateLeadMemberList(data) {
  const request = serviceCreateLeadMemberList(data);
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

export function actionUpdateLeadMemberList(data) {
  const request = serviceUpdateLeadMemberList(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteLeadMemberList(id) {
  const request = serviceDeleteLeadMemberList({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageLeadMemberList(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterLeadMemberList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusLeadMemberList(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterLeadMemberList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageLeadMemberList(page) {
  const stateData = store.getState().lead_member_list;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchLeadMemberList(serverPage + 1, sortingData, {
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
