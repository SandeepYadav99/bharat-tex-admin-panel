import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateBusinessList,
  actionDeleteBusinessList,
  actionFetchBusinessList,
  actionSetPageBusinessList,
  actionUpdateBusinessList,
} from "../../actions/BusinessGreeting.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";

const useBusinessHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
 
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.event_list);
  
  useEffect(() => {
    dispatch(
      actionFetchBusinessList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageBusinessList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateBusinessList(data));
      } else {
        dispatch(actionUpdateBusinessList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageBusinessListRequests(1));
      dispatch(
        actionFetchBusinessList(1, sortingData, {
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
      dispatch(
        actionFetchBusinessList(
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
      dispatch(actionDeleteBusinessList(id));
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
    historyUtils.push(`${RouteName.BUSINESS_GREETING_DETAIL}/${data?.id}`); 
  }, []);

  const handleUpdate = useCallback((data) => {
    
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.BUSINESS_GREETING}/${data?.id}`); //+data.id
  }, []);
  
  const handleCreateFed = useCallback((data) => {
    historyUtils.push(`${RouteName.BUSINESS_GREETING_CREATE}`); //+data.id
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
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
    handleUpdate
  };
};

export default useBusinessHook;
