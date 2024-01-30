/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import {
  actionCreatePolicyList,
  actionDeletePolicyList,
  actionFetchPolicyList,
  actionSetPagePolicyList,
  actionUpdatePolicyList,
} from "../../../actions/PolicyList.action";

const usePolicieList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.policyList);

  useEffect(() => {
    // dispatch(actionFetchAdminUser());
  }, []);

  useEffect(() => {
    dispatch(
      actionFetchPolicyList(
        1,
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
    // dispatch(actionSetPageAdminUser(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      console.log(type, data);
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreatePolicyList(data));
      } else {
        dispatch(actionUpdatePolicyList(data));
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
        actionFetchPolicyList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchAdminUser(1, sortingData))
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
      dispatch(actionSetPagePolicyList(1));
      dispatch(
        actionFetchPolicyList(
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
      dispatch(actionDeletePolicyList(id));
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

  const handleFileView = useCallback((data) => {
    window.open(data?.document, "_blank");
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
    handleFileView,
  };
};

export default usePolicieList;
