import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateMasterList,
  actionDeleteMasterList,
  actionFetchMasterList,
  actionSetPageMasterList,
  actionUpdateMasterList,
} from "../../../actions/MasterList.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";

const useMasterList = ({}) => {
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
  } = useSelector((state) => state.master_list);
  useEffect(() => {
    dispatch(
      actionFetchMasterList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageMasterList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateMasterList(data));
      } else {
        dispatch(actionUpdateMasterList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchMasterList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : value,
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
        actionFetchMasterList(
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
      dispatch(actionDeleteMasterList(id));
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
    historyUtils.push(`${RouteName.CITY_ASSOCIATION_LIST}${data?.id}`); //+data.id
  }, []);

  const handleCreateFed = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.STATE_FEDERATION_CREATE}`); //+data.id
  }, []);

  const ViewNationalDetail = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.NATIONAL_MEMBER_DETAIL}`); //+data.id
  }, []);
  const handleUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.STATE_FEDERATION_UPDATE}${data?.id}`); //+data.id
  }, []);

  const handleViewStateMember = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.STATE_MEMBER_DETAIL}${data?.id}`); //+data.id
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
    ViewNationalDetail,
    handleUpdate,
    handleViewStateMember
  };
};

export default useMasterList;
