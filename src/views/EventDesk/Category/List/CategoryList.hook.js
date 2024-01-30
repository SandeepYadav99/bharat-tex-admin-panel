import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventCategory,
  actionDeleteEventCategory,
  actionFetchEventCategory,
  actionSetPageEventCategory,
  actionUpdateEventCategory,
} from "../../../../actions/UserCategory.action";
import historyUtils from "../../../../libs/history.utils";
import LogUtils from "../../../../libs/LogUtils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/index.services";
import { useParams } from "react-router";

const useCategoryList = ({ location }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.event_category);
  const { id } = useParams();
  const eventId = location?.state?.event_id;

  useEffect(() => {
    dispatch(
      actionFetchEventCategory(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        event_help_desk_category_id: id,
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
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEventCategory(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventCategory(data));
      } else {
        dispatch(actionUpdateEventCategory(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventCategoryRequests(1));
      dispatch(
        actionFetchEventCategory(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_help_desk_category_id: id,
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
        actionFetchEventCategory(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            event_help_desk_category_id: id,
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
      dispatch(actionDeleteEventCategory(id));
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
    historyUtils.push(`${RouteName.EVENTS_DETAILS}${data?.id}`); //+data.id
  }, []);
  const handleUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENT_CATEGORY_UPDATE}${data?.id}`, {
      event_id: eventId,
      parentId: id,
    }); //+data.id
  }, []);
  const handleCreateFed = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENT_CATEGORY_CREATE}`, {
      event_id: eventId,
      parentId: id,
    }); //+data.id
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["ACTIVE", "INACTIVE"],
      },
    ];
  }, [listData]);

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
    configFilter,
    handleCreateFed,
    handleUpdate,
  };
};

export default useCategoryList;
