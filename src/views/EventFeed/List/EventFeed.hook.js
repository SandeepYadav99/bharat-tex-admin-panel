import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventFeed,
  actionDeleteEventFeed,
  actionFetchEventFeed,
  actionSetPageEventFeed,
  actionUpdateEventFeed,
} from "../../../actions/EventFeed.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceDeleteEventFeed } from "../../../services/EventFeed.service";

const useEventFeed = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.event_feed);

  useEffect(() => {
    dispatch(
      actionFetchEventFeed(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        event_id: id,
      })
    );
    isMountRef.current = true;
  }, [id]);

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const toggleRejectDialog = useCallback(
    (obj) => {
      setIsRejectPopUp((e) => !e);
      setDataValue({ ...obj });
    },
    [isRejectPopUp, setDataValue]
  );

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
      setDataValue({ ...obj });
    },
    [isAcceptPopUp, setDataValue]
  );

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEventFeed(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventFeed(data));
      } else {
        dispatch(actionUpdateEventFeed(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventFeedRequests(1));
      dispatch(
        actionFetchEventFeed(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_id: id,
        })
      );
    },
    [sortingData, query, queryData, id]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(
        actionFetchEventFeed(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            event_id: id,
          }
        )
      );
    },
    [query, queryData, id]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteEventFeed(id));
      setEditData(null);
    },
    [setEditData]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
    },
    [setEditData]
  );

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENT_CATEGORY_USER}${data?.id}`, {
      event_id: id,
      name: data?.name,
    }); //+data.id
  }, []);

  const handleUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENT_DESK_UPDATE}${data?.id}`, {
      event_id: id,
    }); //+data.id
  }, []);

  const handleCreateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(`${RouteName.EVENT_DESK_CREATE}`, {
        event_id: id,
      });
    },
    [id]
  );

  const handleRejectApi = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceDeleteEventFeed({ post_id: dataValue?.id }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Deleted Successfully");
          window.location.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [setIsSubmitting, isSubmitting, dataValue, id]);

  const appUserDetail = useCallback((all) => {
    LogUtils.log("data", all);
    historyUtils.push(`${RouteName.USER_PROFILE}${all?.id}`);
  }, [id]);

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleViewDetails,
    isCalling,
    editData,
    handleCreateFed,
    handleUpdate,
    toggleRejectDialog,
    toggleAcceptDialog,
    isRejectPopUp,
    isAcceptPopUp,
    handleRejectApi,
    dataValue,
    appUserDetail,
  };
};

export default useEventFeed;
