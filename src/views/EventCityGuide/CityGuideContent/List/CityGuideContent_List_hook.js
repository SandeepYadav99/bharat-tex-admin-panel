import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventCityContent,
  actionDeleteEventCityContent,
  actionFetchEventCityContent,
  actionSetPageEventCityContent,
  actionUpdateEventCityContent,
} from "../../../../actions/EventCityContent.action";
import { useParams } from "react-router";
import historyUtils from "../../../../libs/history.utils";
import LogUtils from "../../../../libs/LogUtils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/index.services";

const useCityGuidContent_ListHook = ({ location }) => {
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
  } = useSelector((state) => state.event_guide_content);

  const { id } = useParams();

  const selectedEventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);

  console.log("selectedEventId", selectedEventId);
  useEffect(() => {
    dispatch(
      actionFetchEventCityContent(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        event_city_guide_id: id,
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
    dispatch(actionSetPageEventCityContent(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventCityContent(data));
      } else {
        dispatch(actionUpdateEventCityContent(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventCityContentRequests(1));
      dispatch(
        actionFetchEventCityContent(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_city_guide_id: id,
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
        actionFetchEventCityContent(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            event_city_guide_id: id,
          }
        )
      );
    },
    [query, queryData, id]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDeleteContent = useCallback(
    (id) => {
      dispatch(actionDeleteEventCityContent(id?.id));
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
    historyUtils.push(`${RouteName.CITYGUIDE_CONTENT_UPDATE}${data?.id}`); //+data.id
  }, []);

  const handleCreateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(RouteName.CITYGUIDE_CONTENT_CREATE, {
        eventId: selectedEventId,
        cityId: id,
      });
    },
    [id]
  );
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
    handleDeleteContent,
    handleEdit,
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
  };
};

export default useCityGuidContent_ListHook;
