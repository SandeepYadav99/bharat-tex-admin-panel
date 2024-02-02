import store from "../store";
import Constants from "../config/constants";
import {
    serviceCreateExhibitors,
    serviceGetExhibitors,
    serviceUpdateExhibitors,
    serviceDeleteExhibitors,
} from "../services/Exhibitor.service";
import EventEmitter from "../libs/Events.utils";

export const FETCH_INIT = "FETCH_INIT_EXHIBITORS";
export const FETCHED = "FETCHED_EXHIBITORS";
export const FETCHED_FAIL = "FETCHED_FAIL_EXHIBITORS";
export const FETCHED_FILTER = "FETCHED_FILTER_EXHIBITORS";
export const FETCH_NEXT = "FETCH_NEXT_EXHIBITORS";
export const FILTER = "FILTER_EXHIBITORS";
export const RESET_FILTER = "RESET_FILTER_EXHIBITORS";
export const SET_SORTING = "SET_SORTING_EXHIBITORS";
export const SET_FILTER = "SET_FILTER_EXHIBITORS";
export const SET_PAGE = "SET_PAGE_EXHIBITORS";
export const CHANGE_PAGE = "CHANGE_PAGE_EXHIBITORS";
export const CHANGE_STATUS = "CHANGE_STATE_EXHIBITORS";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_EXHIBITORS";
export const CREATE_DATA = "CREATE_EXHIBITORS";
export const UPDATE_DATA = "UPDATE_EXHIBITORS";
export const DELETE_ITEM = "DELETE_EXHIBITORS";

export function actionFetchExhibitors(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetExhibitors({
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

export function actionCreateExhibitors(data) {
    const request = serviceCreateExhibitors(data);
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

export function actionUpdateExhibitors(data) {
    const request = serviceUpdateExhibitors(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({ type: UPDATE_DATA, payload: data.data });
            }
        });
    };
}

export function actionDeleteExhibitors(id) {
    const request = serviceDeleteExhibitors({ id: id });
    return (dispatch) => {
        dispatch({ type: DELETE_ITEM, payload: id });
    };
}

export function actionChangePageExhibitors(page) {
    return (dispatch) => {
        dispatch({ type: CHANGE_PAGE, payload: page });
    };
}

export function actionFilterExhibitors(value) {
    const request = null; ////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({ type: FETCH_INIT, payload: null });
        request.then((data) => {
            dispatch({ type: FILTER, payload: data });
            dispatch({ type: FETCHED, payload: null }); //dispatch function
        });
    };
}

export function actionChangeStatusExhibitors(id, status) {
    return (dispatch) => {
        dispatch({ type: CHANGE_STATUS, payload: { id, status } });
    };
}

export function actionResetFilterExhibitors() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageExhibitors(page) {
    const stateData = store.getState().Exhibitor;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
        store.dispatch(
            actionFetchExhibitors(serverPage + 1, sortingData, {
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
