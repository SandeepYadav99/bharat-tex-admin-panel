import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//     actionCreateAppUser,
//     actionDeleteAppUser,
//     actionFetchAppUser,
//     actionSetPageAppUser,
//     actionUpdateAppUser,
// } from "../../actions/AppUser.action";
import {
    actionCreateExhibitors,
    actionDeleteExhibitors,
    actionFetchExhibitors,
    actionSetPageExhibitors,
    actionUpdateExhibitors,
  } from "../../actions/ExhibitorQuery.action";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
// import { actionFetchCategory, actionSetPageCategory } from "../../actions/ExhibitorQuery.action";
// import { actionCreateEventCategory, actionUpdateEventCategory } from "../../actions/ExhibitorQuery.action";

const useExhibitorQuery = ({ }) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {
        sorting_data: sortingData,
        is_fetching: isFetching,
        query,
        query_data: queryData,
    } = useSelector((state) => state.exhibitor_query);

    useEffect(() => {
        // dispatch(actionFetchAppUser());
    }, []);

    const { user } = useSelector((state) => state?.auth)


    const paylaod = {
        "row": null,
        "order": null,
        "query": "",
        "query_data": null,
        "event_id": `${user?.event_id}`
      }

    useEffect(() => {
        dispatch(
            actionFetchExhibitors(1, {},
                `${user?.event_id}`,
                {
                    query: isMountRef.current ? query : null,
                    query_data: isMountRef.current ? queryData : null,
                })
        );
        isMountRef.current = true;
    }, []);

    const handlePageChange = useCallback((type) => {
        dispatch(actionSetPageExhibitors(type));
    }, []);

    // const handleOpen =()=>{
    //     setOpen(true);
    // }

    // const handleClose =()=>{
    //     setOpen(false);
    // }

    const handleDataSave = useCallback(
        (data, type) => {
            // this.props.actionChangeStatus({...data, type: type});
            if (type == "CREATE") {
                dispatch(actionCreateExhibitors(data));
            } else {
                dispatch(actionUpdateExhibitors(data));
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
                actionFetchExhibitors(1, sortingData, {
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
            dispatch(actionSetPageExhibitors(1));
            dispatch(
                actionFetchExhibitors(
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
            dispatch(actionDeleteExhibitors(id));
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
        historyUtils.push(RouteName.LOCATIONS_CREATE);
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


    const handleCreatecategory = () => {
        historyUtils.push(RouteName.CATEGORY_EVENT_ADD);
    }

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
        handleCreatecategory,
    };
};

export default useExhibitorQuery;
