import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventSponsor,
  actionDeleteEventSponsor,
  actionFetchEventSponsor,
  actionSetPageEventSponsor,
  actionUpdateEventSponsor,
} from "../../../actions/EventSponsor.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";

const useEventSponsor = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const { id } = useParams();

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.event_sponsor);
  
  useEffect(() => {
    dispatch(
      actionFetchEventSponsor(1, sortingData, {
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
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEventSponsor(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventSponsor(data));
      } else {
        dispatch(actionUpdateEventSponsor(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventSponsorRequests(1));
      dispatch(
        actionFetchEventSponsor(1, sortingData, {
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
        actionFetchEventSponsor(
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
      dispatch(actionDeleteEventSponsor(id));
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

  const handleCreateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(RouteName.EVENT_SPONSOR_CREATE, {
        eventId: id,
      });
    },
    [id]
  );

  const handlesponsorType = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(RouteName.EVENT_SPONSOR_TYPE + id);
    },
    [id]
  );

  const handleViewUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENT_SPONSOR_UPDATE}${data?.id}`); //+data.id
  }, []);

  const formatedUrl = (webUrl) => {
    const chunkSize = 40;

    const urlChunks = [];
    for (let i = 0; i < webUrl.length; i += chunkSize) {
      urlChunks.push(webUrl.substring(i, i + chunkSize));
    }

    return urlChunks.join(".");
  };


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
    handleViewUpdate,
    handlesponsorType,
    formatedUrl

  };
};

export default useEventSponsor;
