import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateAppUser,
  actionDeleteAppUser,
  actionFetchAppUser,
  actionSetPageAppUser,
  actionUpdateAppUser,
} from "../../../actions/AppUser.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import LogUtils from "../../../libs/LogUtils";

import { actionFetchTestimonial, actionSetPageTestimonial ,} from "../../../actions/Testimonial.action";
import { useParams } from "react-router-dom";

const useTestimonialList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const {id}=useParams()
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.testimonial);

  useEffect(() => {
    // dispatch(actionFetchAppUser());
  }, []);

  useEffect(() => {
    dispatch(
      actionFetchTestimonial( 1, {}, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        event_id: id
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageTestimonial(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      // if (type == "CREATE") {
      //   dispatch(actionCreateAppUser(data));
      // } else {
      //   dispatch(actionUpdateAppUser(data));
      // }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const handleCreateFed = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(RouteName.TESTIMONIAL_CREATE,{event_id:id}); 
  }, [id]);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageAppUserRequests(1));
      dispatch(
        actionFetchTestimonial(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchAppUser(1, sortingData))
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
      dispatch(actionSetPageTestimonial(1));
      dispatch(
        actionFetchTestimonial(
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
      // dispatch(actionDeleteProductGroup(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
      // setEditData(data);
      // setSidePanel((e) => !e);
      historyUtils.push(`${RouteName.TESTIMONIAL_UPDATE}${data?.id}`,{event_id:id})
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
    historyUtils.push(RouteName.TESTIMONIAL_CREATE);
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
    handleCreateFed
  };
};

export default useTestimonialList;
