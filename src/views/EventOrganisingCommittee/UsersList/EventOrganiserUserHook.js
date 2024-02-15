import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventOrganiserUser,
  actionDeleteEventOrganiserUser,
  actionFetchEventOrganiserUser,
  actionSetPageEventOrganiserUser,
  actionUpdateEventOrganiserUser,
} from "../../../actions/EventOrganiserUser.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { useParams } from "react-router";

const useEventOrganiserUserList = ({location}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const { id } = useParams();

  const selectedEventId = useMemo(() => {
    return location?.state?.event_id;
  }, [location]);
console.log(selectedEventId, "Selected id ")
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.eventOrganiserUser);

  useEffect(() => {
    // dispatch(actionFetchEventOrganiserUser());
  }, []);

  useEffect(() => {
    dispatch(
      actionFetchEventOrganiserUser(
        1,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
          organising_id: id,
          // event_id:selectedEventId
        }
      )
    );
    isMountRef.current = true;
  }, [id]);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEventOrganiserUser(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventOrganiserUser(data));
      } else {
        dispatch(actionUpdateEventOrganiserUser(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventOrganiserUserRequests(1));
      dispatch(
        actionFetchEventOrganiserUser(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          organising_id: id,
        })
      );
      // dispatch(actionFetchEventOrganiserUser(1, sortingData))
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
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(actionSetPageEventOrganiserUser(1));
      dispatch(
        actionFetchEventOrganiserUser(
          1,
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
      dispatch(actionDeleteEventOrganiserUser(id));
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
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const handleEditList = useCallback(
    (data) => {
      historyUtils.push(RouteName.EVENT_ORGANISER_USER_UPDATE + data?.id, {
        organising_id: id,
        event_id:selectedEventId
      });
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback((data) => {
    // historyUtils.push(RouteName.LOCATIONS_DETAILS + data.id); //+data.id
  }, []);

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.EVENT_ORGANISER_USER_CREATE,  {
      organising_id: id,
    });
  }, [id]);

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
    // handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleToggleSidePannel,
    handleEditList,
  };
};

export default useEventOrganiserUserList;
