import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateMemberList,
  actionDeleteMemberList,
  actionFetchMemberList,
  actionSetPageMemberList,
  actionUpdateMemberList,
} from "../../actions/MemberList.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";
import { serviceGetList } from "../../services/index.services";

const useMemberList = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    CHAPTERS: [],
    ADMIN_CHAPTERS: [],
  });

  const {role} = useSelector((state)=>state?.auth)
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.member_list);
  useEffect(() => {
    dispatch(
      actionFetchMemberList(1, sortingData, {
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
    dispatch(actionSetPageMemberList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateMemberList(data));
      } else {
        dispatch(actionUpdateMemberList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageMemberListRequests(1));
      dispatch(
        actionFetchMemberList(1, sortingData, {
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
        actionFetchMemberList(
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
      dispatch(actionDeleteMemberList(id));
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
    historyUtils.push(`${RouteName.MEMBERS_CREATE}`); //+data.id
  }, []);

  const handleViewDetail = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.MEMBERS_DETAILS}${data?.id}`); //+data.id
  }, []);

  const handleViewEdit = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.MEMBERS_UPDATE}${data?.id}`); //+data.id
  }, []);
  
  const configFilter = useMemo(() => {
    return [
      {
        label: "CHAPTER",
        name: "chapters._id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields:role === "GENERAL" ? listData?.CHAPTERS : listData?.ADMIN_CHAPTERS,
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
    handleViewDetail,
    handleViewEdit
  };
};

export default useMemberList;
