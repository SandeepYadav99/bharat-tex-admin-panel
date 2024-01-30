import React, {useCallback, useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionCreateCandidate, actionDeleteCandidate,
    actionFetchCandidate,
    actionSetPageCandidate,
    actionUpdateCandidate
} from "../../actions/Candidate.action";

const useCandidateTable = ({ }) => {
    const [isSidePanel, setSidePanel] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [editData, setEditData] = useState(null);
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);
    const {sorting_data: sortingData, is_fetching: isFetching, query, query_data: queryData} = useSelector(state => state.candidate);

    useEffect(() => {
        dispatch(actionFetchCandidate(1, sortingData, {
            query: isMountRef.current ? query : null,
            query_data: isMountRef.current ? queryData : null,

        }));
        isMountRef.current = true;
    }, []);


    const handlePageChange = useCallback((type) => {
        console.log('_handlePageChange', type);
        dispatch(actionSetPageCandidate(type));
    }, []);


    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
        // dispatch(actionSetPageCandidateRequests(1));
        dispatch(actionFetchCandidate(1, sortingData, {
            query: key == 'SEARCH_TEXT' ? value : query,
            query_data: key == 'FILTER_DATA' ? value : queryData,
        }));
        // dispatch(actionFetchCandidate(1, sortingData))
    }, [sortingData, query, queryData,]);

    const handleFilterDataChange = useCallback((value) => {
        console.log('_handleFilterDataChange', value);
        queryFilter('FILTER_DATA', value);
    }, [queryFilter]);

    const handleSearchValueChange = useCallback((value) => {
        console.log('_handleSearchValueChange', value);
        queryFilter('SEARCH_TEXT', value);
    }, [queryFilter]);



    const handleSortOrderChange = useCallback((row, order) => {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
        dispatch(actionSetPageCandidate(1));
        dispatch(actionFetchCandidate(1, {row, order}, {
            query: query,
            query_data: queryData,
        }))
    }, [query, queryData]);

    const handleRowSize = (page) => {
        console.log(page);
    }


    const handleCheckbox = useCallback((data) => {
        const tempSelected = JSON.parse(JSON.stringify(selected));
        const tempIndex = tempSelected.findIndex(sel => sel.id === data.id);
        if (tempIndex >= 0) {
            tempSelected.splice(tempIndex, 1);
        } else {
            tempSelected.push(data);
        }
        setSelected(tempSelected)
    }, [selected, setSelected]);

    return {
        handlePageChange,
        handleFilterDataChange,
        handleSearchValueChange,
        handleRowSize,
        handleSortOrderChange,
        isCalling,
        editData,
        isSidePanel,
        handleCheckbox,
        selected
    }
};

export default useCandidateTable;
