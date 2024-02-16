import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventCityGuide,
  actionDeleteEventCityGuide,
  actionFetchEventCityGuide,
  actionSetPageEventCityGuide,
  actionUpdateEventCityGuide,
} from "../../../actions/EventCityGuide.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";

const useCityGuidListHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [dataValue, setDataValue] = useState("");

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
  } = useSelector((state) => state.event_guide);

  const { id } = useParams();

  const toggleRejectDialog = useCallback(
    (obj, id) => {
      setIsRejectPopUp((e) => !e);
      if (obj) {
        setDataValue({ type: obj, id: id });
      }
    },
    [isRejectPopUp, setDataValue]
  );

  useEffect(() => {
    dispatch(
      actionFetchEventCityGuide(1, sortingData, {
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
    dispatch(actionSetPageEventCityGuide(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateEventCityGuide(data));
      } else {
        dispatch(actionUpdateEventCityGuide(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchEventCityGuide(1, sortingData, {
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
        actionFetchEventCityGuide(
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
      dispatch(actionDeleteEventCityGuide(id?.id));
      window.location.reload()
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
    historyUtils.push(`${RouteName.EVENT_CITYGUIDE_UPDATE}${data?.id}`); //+data.id
  }, []);

  const handleCreateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(RouteName.EVENT_CITYGUIDE_CREATE, {
        eventId: id,
      });
    },
    [id]
  );
  const handleCityVisit = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.CITYGUIDE_CONTENT_LIST}${data?.id}`, {
      eventId: id,
      name:data?.title,
    });
  }, []);

  const handleCreateNewBanner = useCallback((data) => {
    LogUtils.log("data", data);
    // historyUtils.push(`${RouteName.EVENT_CITYGUIDE_CREATE}`); //+data.id
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
    handleCreateNewBanner,
    handleCityVisit,
    isRejectPopUp,
    toggleRejectDialog,
    dataValue,
  };
};

export default useCityGuidListHook;
