import store from "../store";
import Constants from "../config/constants";
import { serviceCreatePolicyList, serviceDeletePolicyList, serviceGetPolicyList, serviceUpdatePolicyList } from "../services/Policy.service";

export const FETCH_INIT = "FETCH_INIT_POLICY_LIST";
export const FETCHED = "FETCHED_POLICY_LIST";
export const FETCHED_FAIL = "FETCHED_FAIL_POLICY_LIST";
export const FETCHED_FILTER = "FETCHED_FILTER_POLICY_LIST";
export const FETCH_NEXT = "FETCH_NEXT_POLICY_LIST";
export const FILTER = "FILTER_POLICY_LIST";
export const RESET_FILTER = "RESET_FILTER_POLICY_LIST";
export const SET_SORTING = "SET_SORTING_POLICY_LIST";
export const SET_FILTER = "SET_FILTER_POLICY_LIST";
export const SET_PAGE = "SET_PAGE_POLICY_LIST";
export const CHANGE_PAGE = "CHANGE_PAGE_POLICY_LIST";
export const CHANGE_STATUS = "CHANGE_STATE_POLICY_LIST";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_POLICY_LIST";
export const CREATE_DATA = "CREATE_POLICY_LIST";
export const UPDATE_DATA = "UPDATE_POLICY_LIST";
export const DELETE_ITEM = "DELETE_POLICY_LIST";

export function actionFetchPolicyList(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetPolicyList({
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

export function actionCreatePolicyList(data) {
  
  const request = serviceCreatePolicyList(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdatePolicyList(data) {
  const request = serviceUpdatePolicyList(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeletePolicyList(id) {
  const request = serviceDeletePolicyList({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageAdminUser(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterPolicyList(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusPolicyList(id, status) {
  //const request = serviceUpdateAdminUser({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterPolicyList() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPagePolicyList(page) {
  const stateData = store.getState().policyList;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchPolicyList(serverPage + 1, sortingData, {
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
