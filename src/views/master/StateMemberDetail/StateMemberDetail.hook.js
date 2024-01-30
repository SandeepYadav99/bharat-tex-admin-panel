import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateStateMember,
  actionDeleteStateMember,
  actionFetchStateMember,
  actionSetPageStateMember,
  actionUpdateStateMember,
} from "../../../actions/StateMember.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";
import { serviceDetailsStateMember } from "../../../services/StateMember.service";
import { serviceDetailsCityAssocList } from "../../../services/CityAssocList.service";

function useStateMemberDetail() {
  const [isCalling, setIsCalling] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [CityData, setCityData] = useState({});
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const dispatch = useDispatch();
  const { id } = useParams();

  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.state_member_list);

  useEffect(() => {
    let req = serviceDetailsCityAssocList({ id: id });
    req.then((data) => {
      setCityData(data?.data?.details);
    });
  }, [id]);

  useEffect(() => {
    dispatch(
      actionFetchStateMember(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        chapter_id: id,
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
    dispatch(actionSetPageStateMember(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateStateMember(data));
      } else {
        dispatch(actionUpdateStateMember(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      // setEditData(data?.id);
    },
    [setSidePanel]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageStateMemberRequests(1));
      dispatch(
        actionFetchStateMember(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          chapter_id: id,
        })
      );
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
      dispatch(
        actionFetchStateMember(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            chapter_id: id,
          }
        )
      );
    },
    [query, queryData,id]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteStateMember(id));
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

  const handlePushProfilePage =(all)=>{
    historyUtils.push(RouteName.USER_PROFILE+all?.id)
   }

  const handleViewDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.CITY_ASSOCIATION_LIST}${data?.id}`); //+data.id
  }, []);

  const handleCreateFed = useCallback(() => {
    historyUtils.push(RouteName.MEMBERS_CREATE, {
      parent_id: CityData?.id,
    });
  }, [CityData, setCityData]);

  const handleViewUpdate = useCallback((data) => {
    historyUtils.push(`${RouteName.CITY_ASSOCIATION_UPDATE}${data?.id}`);
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
    handleViewUpdate,
    CityData,
    handleToggleSidePannel,
    isSidePanel,
    handlePushProfilePage,
  };
}

export default useStateMemberDetail;
