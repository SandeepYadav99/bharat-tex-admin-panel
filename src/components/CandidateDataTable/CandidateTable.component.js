/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, {Component, useCallback, useMemo} from 'react';
import {Button, ButtonBase, Checkbox, IconButton, withStyles} from "@material-ui/core";
import styles from './Style.module.css';
import DataTables from '../../Datatables/Datatable.table';
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import useCandidateTable from "./CandidateTable.hook";
import StatusPill from "../Status/StatusPill.component";
import Constants from "../../config/constants";
import {useSelector} from "react-redux";
import FilterComponent from "../Filter/Filter.component";

const CandidateTable = ({}) => {

    const { handleSortOrderChange , handleRowSize, handlePageChange,  handleEdit,
        handleFilterDataChange, handleSearchValueChange, handleViewDetails, editData, isCalling,  toggleProductDialog, handleCheckbox, selected
    } = useCandidateTable({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.candidate);

    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);


    const renderFirstCell = useCallback((data) => {
        const selectedIndex = selected.findIndex(sel => sel.id === data.id);
        return (
            <div className={styles.flex}>
                <Checkbox
                    disabled={false}
                    onChange={() => handleCheckbox(data)}
                    checked={selectedIndex >= 0}
                    value="secondary"
                    color="primary"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
            </div>
        )
    }, [handleCheckbox, selected]);

    const tableStructure = useMemo(() => {
        return [
            {
                key: 'sku_code',
                label: 'SKU Code',
                sortable: false,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'name',
                label: 'Candidate',
                sortable: false,
                render: (temp, all) => <div>{all?.name} <br/>{all?.email}</div>,
            },
            {
                key: 'createdAt',
                label: 'Added Date',
                sortable: false,
                render: (temp, all) => <div>{all?.createdAtText}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: false,
                render: (temp, all) => <div><StatusPill status={all?.status} /></div>,
            },
            {
                key: 'resume',
                label: 'Resume',
                sortable: false,
                render: (temp, all) => <div><a href={all.resume} target={'_blank'}>Resume</a></div>,
            },

        ];
    }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

    const tableData = useMemo(() => {
        const datatableFunctions = {
            // onCellClick: this.handleCellClick,
            // onCellDoubleClick: this.handleCellDoubleClick,
            // onFilterValueChange: this._handleSearchValueChange.bind(this),
            onSortOrderChange: handleSortOrderChange,
            onPageChange: handlePageChange,
            // onRowSelection: this.handleRowSelection,
            onRowSizeChange: handleRowSize,
        };

        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: data,
            count: data.length,
            page: currentPage - 1,
            rowsPerPage: 10,
            allRowSelected: false,
            showSelection: false
        };

        return { datatableFunctions, datatable };
    }, [ tableStructure, handleSortOrderChange, handlePageChange, handleRowSize,data, currentPage, data]); // allData,

    return (
        <div>
            <div className={'plainPaper'}>
                <br/>
                <FilterComponent
                    is_progress={isFetching}
                    filters={[]}
                    handleSearchValueChange={handleSearchValueChange}
                    handleFilterDataChange={handleFilterDataChange}
                />
                <br/>
                <DataTables
                    {...tableData.datatable}
                    {...tableData.datatableFunctions}
                />
            </div>
        </div>
    )

}


export default CandidateTable
