import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   actionCreateLeadMemberList,
//   actionDeleteLeadMemberList,
//   actionFetchLeadMemberList,
//   actionSetPageLeadMemberList,
//   actionUpdateLeadMemberList,
// } from "../../../actions/LeadMemberList.action";

import { serviceRejectLeadMemberList } from "../../../services/LeadMemberList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import {
  actionCreateEventUserRequest,
  actionDeleteEventUserRequest,
  actionFetchEventUserRequest,
  actionSetPageEventUserRequest,
  actionUpdateEventUserRequest,
} from "../../../actions/EventUserRequest.action";
import { serviceAcceptEventUserRequest } from "../../../services/EventUserRequest.service";

const useEventUserHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    CHAPTERS: [],
    ADMIN_CHAPTERS: [],
  });
  const { role } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.lead_member_list);
  useEffect(() => {
    dispatch(
      actionFetchEventUserRequest(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    serviceGetList(["ADMIN", "CHAPTERS", "EVENTS", "ADMIN_CHAPTERS", "ADMIN_EVENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageEventUserRequest(type));
  }, []);

  const toggleRejectDialog = useCallback(
    (obj) => {
      setIsRejectPopUp((e) => !e);
      setDataValue({ ...obj });
    },
    [isRejectPopUp, setDataValue]
  );

  const handleRejectApi = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      serviceRejectLeadMemberList({ lead_id: dataValue?.id }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Rejected Successfully");
          window.location.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [setIsSubmitting, isSubmitting, dataValue]);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
      setDataValue({ ...obj });
    },
    [isAcceptPopUp, setDataValue]
  );

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventUserRequest(data));
      } else {
        dispatch(actionUpdateEventUserRequest(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageLeadMemberListRequests(1));
      dispatch(
        actionFetchEventUserRequest(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
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
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(
        actionFetchEventUserRequest(
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
      dispatch(actionDeleteEventUserRequest(id));
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
    historyUtils.push(`${RouteName.STATE_FEDERATION_CREATE}`); //+data.id
  }, []);

  const handleAcceptData = () => {
    serviceAcceptEventUserRequest({
      lead_id: dataValue?.id,
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils.success("Request Accepted");
        window.location?.reload();
      } else {
        SnackbarUtils.error(res?.message);
      }
    });
  };

  const configFilter = useMemo(() => {
    return [
      {
        label: "Event",
        name: "event_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: role === "GENERAL" ? listData?.EVENTS : listData?.ADMIN_EVENTS,
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
    toggleRejectDialog,
    toggleAcceptDialog,
    isRejectPopUp,
    isAcceptPopUp,
    dataValue,
    handleRejectApi,
    handleAcceptData,
  };
};

export default useEventUserHook;
