import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateKnowledgeList,
  actionDeleteKnowledgeList,
  actionFetchKnowledgeList,
  actionSetPageKnowledgeList,
  actionUpdateKnowledgeList,
} from "../../../actions/KnowledgeCenterStamp.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { useParams } from "react-router-dom";

const useList = () => {
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

  const { id } = useParams();

  useEffect(() => {
    dispatch(
      actionFetchKnowledgeList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        knowledge_center_id: `${id}`,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
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
      dispatch(
        actionFetchKnowledgeList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        knowledge_center_id: `${id}`,
        })
      );
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
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
      dispatch(
        actionFetchKnowledgeList(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            knowledge_center_id: `${id}`,
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
    LogUtils.log("data", data); 
    if(data?.type === "link"){
      window.open(data?.link, "_blank", "noopener,noreferrer");
    }
    else{
      window.open(data?.document, "_blank", "noopener,noreferrer");
    }
  }, []);

  const handleUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(
      `${RouteName.KNOWLEDGE_CENTER_STAMP_CREATE}/${data?.id}`,
      {
        knowledge_center_id: id,
      }
    );
  }, []);

  const handleCreateFed = useCallback((data) => {
    historyUtils.push(`${RouteName.KNOWLEDGE_CENTER_STAMP_CREATE}`, {
      knowledge_center_id: id,
    });
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
  };
};

export default useList;
