import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateAppUser,
  actionDeleteAppUser,
  actionFetchAppUser,
  actionSetPageAppUser,
  actionUpdateAppUser,
} from "../../../../actions/AppUser.action";


const useAssociateChapter = () => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.App_User);

  useEffect(() => {
    // dispatch(actionFetchAppUser());
  }, []);

 

  useEffect(() => {
    dispatch(
      actionFetchAppUser(1, {}, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageAppUser(type));
  }, []);



  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateAppUser(data));
      } else {
        dispatch(actionUpdateAppUser(data));
      }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageAppUserRequests(1));
      dispatch(
        actionFetchAppUser(1, sortingData, {
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
      dispatch(actionSetPageAppUser(1));
      dispatch(
        actionFetchAppUser(
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
      dispatch(actionDeleteAppUser(id));
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
    editData,
    isSidePanel,
    configFilter,
    handleToggleSidePannel,
  };
};

export default useAssociateChapter;




