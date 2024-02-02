import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateExhibitor,
  serviceDeleteExhibitor,
  serviceGetExhibitor,
  serviceUpdateExhibitor,
  serviceDetailsExhibitor,
  feedPostExhibitor,
  feedCommentByPost,
  feedAssociateChapter,
  serviceFeedDelete,
  serviceFeedCommentDeletePostId,
  serviceFeedCommentByPost,
  serviceFeedDetailsComment,
} from "../services/Exhibitor.service";
import SnackbarUtils from "../libs/SnackbarUtils";

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

export function actionFetchExhibitor(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetExhibitor({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetExhibitor
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

export function actionCreateExhibitor(data) {
  const request = serviceCreateExhibitor(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateExhibitor(data) {
  const request = serviceUpdateExhibitor(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteExhibitor(id) {
  const request = serviceDeleteExhibitor({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageExhibitor(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterExhibitor(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusExhibitor(id, status) {
  //const request = serviceUpdateExhibitor({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterExhibitor() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageExhibitor(page) {
  const stateData = store.getState().App_User;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchExhibitor(serverPage + 1, sortingData, {
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

export function actionDetailExhibitor(data) {
  const request = serviceDetailsExhibitor(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: PROFILE_DETAILS, payload: data });
      } else {
        SnackbarUtils.error(data?.message);
      }
    });
  };
}

export function feedPostExhibitorData(data) {
  const request = feedPostExhibitor(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: APP_USER_FEED_POST, payload: data });
      }
    });
  };
}

export function feedCommentByExhibitor(data) {
  const request = feedCommentByPost(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: APP_USER_COMMENT, payload: data });
      }
    });
  };
}

export function feedExhibitorAssociateChapter(data) {
  const request = feedAssociateChapter(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: APP_USER_ASSOCIATE_CHAPTERS, payload: data });
      }
    });
  };
}

export function feedDeleteExhibitor(data) {
  const request = serviceFeedDelete(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: APP_USER_FEED_DELETE, payload: data });
      }
    });
  };
}

export function feedCommentDeleteExhibitorFeed(data) {
  const request = serviceFeedCommentDeletePostId(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: APP_USER_FEED_COMMENT_DELETE, payload: data });
      }
    });
  };
}

export function commentsByFeedsExhibitor(data) {
  const request = serviceFeedCommentByPost(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: APP_USER_COMMENTS_BY_FEEDS, payload: data });
      }
    });
  };
}

export function serviceExhibitorCommentDetails(params) {
  const request = serviceFeedDetailsComment(params);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: APP_USER_COMMENTS_INFO, payload: data });
      }
    });
  };
}
