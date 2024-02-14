import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import {
  actionChangePageEventSchedule,
  actionCreateEventSchedule,
  actionDeleteEventSchedule,
  actionFetchEventSchedule,
  actionSetPageEventSchedule,
  actionUpdateEventSchedule,
} from "../../../../actions/EventSchedule.action";
import { useParams } from "react-router";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import {
  serviceDeleteEventSchedule,
  serviceEventScheduleHideLive,
  serviceEventScheduleLive,
} from "../../../../services/EventSchedule.service";

const useEventScheduleList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [dataValue, setDataValue] = useState("");

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const { id } = useParams();
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.eventSchedule);

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
      actionFetchEventSchedule(
        1,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
          event_id: id,
        }
      )
    );
    isMountRef.current = true;
  }, [id]);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionChangePageEventSchedule(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      console.log(type, data);
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventSchedule(data));
      } else {
        dispatch(actionUpdateEventSchedule(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageAdminUserRequests(1));
      dispatch(
        actionFetchEventSchedule(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_id: id,
        })
      );
      // dispatch(actionFetchAdminUser(1, sortingData))
    },
    [sortingData, query, queryData, id]
  );


  const handleAddCategory =()=>{
   historyUtils.push(RouteName.CATEGORY_LIST)
  }

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

  const handleLiveApi = useCallback(
    (all) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        let request;
        if (dataValue?.type === "live") {
          request = serviceEventScheduleLive;
        } else {
          request = serviceEventScheduleHideLive;
        }
        console.log('dataValue',dataValue)
        request({ id: dataValue?.id }).then((res) => {
          if (!res.error) {
            SnackbarUtils.success(
              `${dataValue.type.toUpperCase()} Successfully`
            );
            window.location.reload();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [setIsSubmitting, isSubmitting, dataValue]
  );


  const handleDeleteData =(all)=>{
    serviceDeleteEventSchedule({id:all?.id}).then((res)=>window.location.reload())
  }

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(actionSetPageEventSchedule(1));
      dispatch(
        actionFetchEventSchedule(
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
      dispatch(actionDeleteEventSchedule(id));
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
    ];
  }, []);

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
    handleLiveApi,
    isRejectPopUp,
    toggleRejectDialog,
    dataValue,
    handleAddCategory,
    handleDeleteData,
  };
};

export default useEventScheduleList;
