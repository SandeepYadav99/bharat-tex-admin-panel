import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { actionCreateAlbumList, actionDeleteAlbumList, actionFetchAlbumList, actionSetPageAlbumList, actionUpdateAlbumList } from "../../../actions/GalleryAlbum.action";

const useAlbumList = ({ }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    CHAPTERS: [],
    ADMIN_CHAPTERS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.album_list);

  useEffect(() => {
    dispatch(
      actionFetchAlbumList(1, sortingData, {
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
    console.log("_handlePageChange", type);
    dispatch(actionSetPageAlbumList(type));
  }, []);

  const { role } = useSelector((state) => state?.auth)

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateAlbumList(data));
      } else {
        dispatch(actionUpdateAlbumList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      // dispatch(actionSetPageEventListRequests(1));
      dispatch(
        actionFetchAlbumList(1, sortingData, {
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
        actionFetchAlbumList(
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
      dispatch(actionDeleteAlbumList(id));
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
    historyUtils.push(`${RouteName.ALBUMS_CREATE}`); //+data.id
  }, []);

  const handleListDetails = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.ALBUMS_DETAILS}${data?.id}`); //+data.id
  }, []);

  const handleViewUpdate = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.ALBUMS_UPDATE}${data.id}`); //+data.id
  }, []);

  const configFilter = useMemo(() => {

    return [
      {
        label: "Chapter",
        name: "related_chapter_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: role === "GENERAL" ? listData?.CHAPTERS : listData?.ADMIN_CHAPTERS,
      },

    ];
  }, [listData]);


  console.log(listData?.CHAPTERS, "listData is here")

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    // handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
    handleListDetails,
    handleViewUpdate

  };
};

export default useAlbumList;
