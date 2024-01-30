import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateKnowledgeList,
  actionDeleteKnowledgeList,
  actionFetchKnowledgeList,
  actionSetPageKnowledgeList,
  actionUpdateKnowledgeList,
} from "../../actions/Knowledge.action";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import RouteName from "../../routes/Route.name";

const useKnowledgeCenter = ({location}) => {

  const locationData = location?.state?.name_data;
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
      actionFetchKnowledgeList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);


  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageKnowledgeList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateKnowledgeList(data));
      } else {
        dispatch(actionUpdateKnowledgeList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchKnowledgeList(1, sortingData, {
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
        actionFetchKnowledgeList(
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
      dispatch(actionDeleteKnowledgeList(id));
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
    historyUtils.push(`${RouteName.KNOWLEDGE_CENTER_LIST}/${data?.id}`,{
      name_data:data?.name
    });
  }, []);



  const handleUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.KNOWLEDGE_CENTER_UPDATE}/${data?.id}`); 
  }, []);

  const handleCreateFed = useCallback((data) => {
    historyUtils.push(`${RouteName.KNOWLEDGE_CENTER_CREATE}`); 
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
    handleUpdate,
    locationData,
  };
};

export default useKnowledgeCenter;
