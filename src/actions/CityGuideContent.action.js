import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateCityGuideContent,
  serviceGetCityGuideContent,
  serviceUpdateCityGuideContent,
  serviceDeleteCityGuideContent,
} from "../services/CityGuideContent.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_CITY_GUIDE_CONTENT";
export const FETCHED = "FETCHED_CITY_GUIDE_CONTENT";
export const FETCHED_FAIL = "FETCHED_FAIL_CITY_GUIDE_CONTENT";
export const FETCHED_FILTER = "FETCHED_FILTER_CITY_GUIDE_CONTENT";
export const FETCH_NEXT = "FETCH_NEXT_CITY_GUIDE_CONTENT";
export const FILTER = "FILTER_CITY_GUIDE_CONTENT";
export const RESET_FILTER = "RESET_FILTER_CITY_GUIDE_CONTENT";
export const SET_SORTING = "SET_SORTING_CITY_GUIDE_CONTENT";
export const SET_FILTER = "SET_FILTER_CITY_GUIDE_CONTENT";
export const SET_PAGE = "SET_PAGE_CITY_GUIDE_CONTENT";
export const CHANGE_PAGE = "CHANGE_PAGE_CITY_GUIDE_CONTENT";
export const CHANGE_STATUS = "CHANGE_STATE_CITY_GUIDE_CONTENT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_CITY_GUIDE_CONTENT";
export const CREATE_DATA = "CREATE_CITY_GUIDE_CONTENT";
export const UPDATE_DATA = "UPDATE_CITY_GUIDE_CONTENT";
export const DELETE_ITEM = "DELETE_CITY_GUIDE_CONTENT";

export function actionFetchCityGuideContent(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetCityGuideContent({
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

export function actionCreateCityGuideContent(data) {
  const request = serviceCreateCityGuideContent(data);
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

export function actionUpdateCityGuideContent(data) {
  const request = serviceUpdateCityGuideContent(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteCityGuideContent(id) {
  const request = serviceDeleteCityGuideContent({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageCityGuideContent(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterCityGuideContent(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusCityGuideContent(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterCityGuideContent() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageCityGuideContent(page) {
  const stateData = store.getState().cityGuide_Content;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchCityGuideContent(serverPage + 1, sortingData, {
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
