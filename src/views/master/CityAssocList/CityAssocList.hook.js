import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateCityAssocList,
  actionDeleteCityAssocList,
  actionFetchCityAssocList,
  actionSetPageCityAssocList,
  actionUpdateCityAssocList,
} from "../../../actions/CityAssocList.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";
import { serviceDetailsCityAssocList } from "../../../services/CityAssocList.service";

function useCityAssocList() {
  const [isCalling, setIsCalling] = useState(false);
  const [CityData, setCityData] = useState({});
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const dispatch = useDispatch();
  const { id } = useParams();

  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.city_assoc_list);

  useEffect(() => {
    let req = serviceDetailsCityAssocList({ id: id });
    req.then((data) => {
      setCityData(data?.data?.details);
    });
  }, [id]);

  useEffect(() => {
    dispatch(
      actionFetchCityAssocList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        parent_chapter_id: id,
      })
    );
    isMountRef.current = true;
  }, []);

  
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageCityAssocList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateCityAssocList(data));
      } else {
        dispatch(actionUpdateCityAssocList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageCityAssocListRequests(1));
      dispatch(
        actionFetchCityAssocList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          parent_chapter_id: id,
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
        actionFetchCityAssocList(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            parent_chapter_id: id,
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
      dispatch(actionDeleteCityAssocList(id));
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

  const handleCreateFed = useCallback(() => {
    historyUtils.push(`${RouteName.CITY_ASSOCIATION_CREATE}`, {
      parent_id: CityData?.id,
    });
  }, [CityData, setCityData]);

  const handleViewUpdate = useCallback((data) => {
    historyUtils.push(`${RouteName.CITY_ASSOCIATION_UPDATE}${data?.id}`);
  }, []);

  const handleCityMember = useCallback((data) => {
    historyUtils.push(`${RouteName.CITY_MEMBER_DETAIL}${data?.id}`);
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
    handleCityMember
  };
}

export default useCityAssocList;
