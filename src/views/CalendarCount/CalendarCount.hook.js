import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateCalendarCount,
  actionDeleteCalendarCount,
  actionFetchCalendarCount,
  actionSetPageCalendarCount,
  actionUpdateCalendarCount,
} from "../../actions/CalendarCount.action";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import LogUtils from "../../libs/LogUtils";
// import { serviceExhibitorList } from "../../services/Exhibitor.service";

const useCalendarCount = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const [listData, setListData] = useState({
    PRODUCT_GROUP: [],
    PRODUCT_CATEGORY: [],
  });

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.Exhibitor);

  //   useEffect(() => {
  //     serviceCalendarCountList({ list: ["PRODUCT_CATEGORY", "PRODUCT_GROUP"] }).then(
  //       (res) => {
  //         if (!res.error) {
  //           setListData(res.data);
  //         }
  //       }
  //     );
  //   }, []);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      actionFetchCalendarCount(
        1,
        user?.event_id,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
        }
      )
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageCalendarCount(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateCalendarCount(data));
      } else {
        dispatch(actionUpdateCalendarCount(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const handleCreateFed = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EXHIBITOR_CREATE}`);
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageCalendarCountRequests(1));
      dispatch(
        actionFetchCalendarCount(
          1,
          user?.event_id,
          sortingData,
          {
            query: key == "SEARCH_TEXT" ? value : query,
            // query_data: key == "FILTER_DATA" ? value : queryData,
          }
        )
      );
    },
    [sortingData, query, queryData]
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
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      dispatch(actionSetPageCalendarCount(1));
      dispatch(
        actionFetchCalendarCount(
          1,
          user?.event_id,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteCalendarCount(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
    },
    [setEditData, setSidePanel]
  );

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditData(data?.id);
    },
    [setSidePanel, setEditData]
  );

  const handleSideToggle = useCallback(
    (data) => {
      historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(RouteName.LOCATIONS_DETAILS + data.id); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.LOCATIONS_CREATE);
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["ACTIVE", "INACTIVE"],
      },
      {
        label: "Venue",
        name: "event_venue",
        type: "select",
        fields: ["BHARAT_MANDAPAM", "YASHOBHOOMI"],
      },
      {
        label: "Product Groups",
        name: "product_groups.name",
        type: "selectObject",
        custom: { extract: { id: "name", title: "name" } },
        fields: listData?.PRODUCT_GROUP,
      },
    ];
  }, [listData]);

  // const handleUpdatePage =useCallback((all)=>{
  //   historyUtils.push(`${RouteName.EXHIBITOR_CREATE}`+ all?.id);
  // },[])

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleToggleSidePannel,
    handleCreateFed,
  };
};

export default useCalendarCount;
