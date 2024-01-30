import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventParticipant,
  actionDeleteEventParticipant,
  actionFetchEventParticipant,
  actionSetPageEventParticipant,
  actionUpdateEventParticipant,
} from "../../../actions/EventParticipant.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import {useParams} from "react-router";

const useEventParticipantList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
    const [isEditSidePanel, setEditSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {id} = useParams();
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.adminUser);

  useEffect(() => {
    // dispatch(actionFetchEventParticipant());
  }, []);

  useEffect(() => {
    dispatch(
      actionFetchEventParticipant(1, {}, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
          event_id: id
      })
    );
    isMountRef.current = true;
  }, [id]);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEventParticipant(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventParticipant(data));
      } else {
        dispatch(actionUpdateEventParticipant(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventParticipantRequests(1));
      dispatch(
        actionFetchEventParticipant(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_id: id
        })
      );
      // dispatch(actionFetchEventParticipant(1, sortingData))
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
      dispatch(actionSetPageEventParticipant(1));
      dispatch(
        actionFetchEventParticipant(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            event_id: id
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
      dispatch(actionDeleteEventParticipant(id));
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

  const handleToggleSidePannel = useCallback((data) => {
      setSidePanel((e) => !e);
      // setEditData(data?.id);
    },
    [setSidePanel, setEditData]
  );

    const handleToggleEditSidePannel = useCallback((data) => {
            setEditSidePanel((e) => !e);
            setEditData(data);
        },
        [setEditSidePanel, setEditData]
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
      handleToggleEditSidePannel,
      isEditSidePanel,
  };
};

export default useEventParticipantList;
