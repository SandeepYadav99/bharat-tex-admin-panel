import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventPolls,
  actionDeleteEventPolls,
  actionFetchEventPolls,
  actionSetPageEventPolls,
  actionUpdateEventPolls,
} from "../../../actions/EventPolls.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import {useParams} from "react-router";

const useEventPollsList = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const {id}=useParams()
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.member_list);
  useEffect(() => {
    dispatch(
      actionFetchEventPolls(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        event_id:id
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
    dispatch(actionSetPageEventPolls(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventPolls(data));
      } else {
        dispatch(actionUpdateEventPolls(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventPollsRequests(1));
      dispatch(
        actionFetchEventPolls(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_id:id
        })
      );
    },
    [sortingData, query, queryData,id]
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
        actionFetchEventPolls(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            event_id:id
          }
        )
      );
    },
    [query, queryData,id]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteEventPolls(id));
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

  const handleCreateFed = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENT_POLLS_CREATE}`,{
      eventId: id,
    }); //+data.id
  }, []);

  const handleViewUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENT_POLLS_UPDATE}${data?._id}`); //+data.id
  }, []);
  
  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },
      {
        label: "Claim Category",
        name: "category",
        type: "select",
        fields: ["PART B", "PART E"],
      },
      {
        label: "Financial year",
        name: "fy_year",
        type: "select",
        fields: ["2023-2024"],
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
    handleCreateFed,
    isCalling,
    editData,
    configFilter,
    handleViewUpdate
  };
};

export default useEventPollsList;
