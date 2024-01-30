import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionCreateCandidate, actionDeleteCandidate,
    actionFetchCandidate,
    actionSetPageCandidate,
    actionUpdateCandidate
} from "../../actions/Candidate.action";
import {serviceRejectJobCandidates, serviceShortlistJobCandidates} from "../../services/JobOpenings.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import {actionGetJobOpeningCandidates} from "../../actions/JobOpeningDetail.action";
import Constants from "../../config/constants";

const useCandidateInterviewTable = ({jobId, handleClose }) => {
    const [selected, setSelected] = useState([]);
    const [allData, setAllData] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [currentData,setCurrentData] = useState([]);
    const [isDialog, setIsDialog] = useState(false);
    const [totalShow, setTotalShow] = useState(10);
    const [isFetching, setIsFetching] = useState(false);
    const { candidates, isCandidatesFetching, interviewers } = useSelector((state) => state.job_opening_detail);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const status = Constants.JOB_CANDIDATE_STATUS
        const shortlistedCandidates = candidates.filter((val) => [status.CV_SHORTLISTED, status.INTERVIEW_ALIGNED, status.SELECTED].indexOf(val.status) >= 0);
        setAllData(shortlistedCandidates);
        setData(shortlistedCandidates);
    }, [candidates]);

    useEffect(() => {
        // initData();
        _processData();
    },[currentPage, data]);

    const _processData = () =>  {
        const from = (((currentPage) * totalShow) - totalShow);
        let to = (((currentPage) * totalShow));
        // all.filter((val, index) => {
        //     if (index >= (((currentPage) * totalShow) - totalShow) && index < (((currentPage) * totalShow))) {
        //         return val;
        //     }
        // });
        if (from <= data.length) {
            to = to <= data.length ? to : data.length;
            setCurrentData(data.slice(from, to));
        }
    }

    const handlePageChange = useCallback((type) => {
        console.log('_handlePageChange', type);
        if (Math.ceil(data.length / totalShow) >= (type + 1)) {
            setCurrentPage(type+1);
            _processData();
        }
    }, [_processData, setCurrentPage, data, totalShow]);


    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
    }, []);

    const handleFilterDataChange = useCallback((value) => {
        console.log('_handleFilterDataChange', value);
        queryFilter('FILTER_DATA', value);
    }, [queryFilter]);

    const handleSearchValueChange = useCallback((value) => {
        console.log('_handleSearchValueChange', value);
        queryFilter('SEARCH_TEXT', value);
        if (value) {
            const tempData = allData.filter((val) => {
                if (val?.candidate?.name?.match(new RegExp(value, 'ig')) || val?.candidate?.email?.match(new RegExp(value, 'ig'))) {
                    return val;
                }
            });
            setData(tempData);
        } else {
            setData(allData);
        }

    }, [queryFilter, _processData, data, setData, allData]);



    const handleSortOrderChange = useCallback((row, order) => {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
    }, []);

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

    const toggleConfirmDialog = useCallback((type) => {
        if(selected?.length === 0){
            SnackbarUtils.error('Interview panel not defined');
        }
        else{
            setIsDialog(e => !e);
        }

    }, [setIsDialog,selected]);


    const handleInterviewSchedule = useCallback(() => {
        setSelected([]);
        toggleConfirmDialog();
        handleClose();
    }, [toggleConfirmDialog, setSelected, handleClose]);

    return {
        handlePageChange,
        handleFilterDataChange,
        handleSearchValueChange,
        handleRowSize,
        handleSortOrderChange,
        handleCheckbox,
        selected,
        currentPage,
        currentData,
        data,
        allData,
        isFetching,
        isDialog,
        toggleConfirmDialog,
        isSubmitting,
        handleInterviewSchedule,
        interviewers
    }
};

export default useCandidateInterviewTable;
