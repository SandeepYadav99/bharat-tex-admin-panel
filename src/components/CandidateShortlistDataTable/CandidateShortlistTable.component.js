/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, {Component, useCallback, useMemo, useState} from "react";
import {
    Button,
    ButtonBase,
    Checkbox,
} from "@material-ui/core";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import StatusPill from "../Status/StatusPill.component";
import Constants from "../../config/constants";
import {useSelector} from "react-redux";
import FilterComponent from "../Filter/Filter.component";
import useCandidateShortlistTable from "./CandidateShortlistTable.hook";
import DialogComponent from "./Dialog.component";


const CandidateShortlistTable = ({jobId, handleClose}) => {
    const {
        handleSortOrderChange,
        handleRowSize,
        handlePageChange,
        handleEdit,
        handleFilterDataChange,
        handleSearchValueChange,
        handleViewDetails,
        editData,
        isCalling,
        toggleProductDialog,
        handleCheckbox,
        selected,
        data,
        currentData,
        currentPage,
        isFetching,
        isDialog,
        toggleConfirmDialog,
        dialogText,
        handleDialogConfirm,
        isSubmitting,
        handleRequestShortlist,
        canShortlist
    } = useCandidateShortlistTable({jobId, handleClose});


    const renderFirstCell = useCallback(
        (data) => {
            const selectedIndex = selected.findIndex((sel) => sel.id === data.id);
            return (
                <div className={styles.flex}>
                    <Checkbox
                        disabled={data?.status !== Constants.JOB_CANDIDATE_STATUS.PENDING &&  data?.status !== Constants.JOB_CANDIDATE_STATUS.PENDING_REVIEW }
                        onChange={() => handleCheckbox(data)}
                        checked={selectedIndex >= 0}
                        value="secondary"
                        color="primary"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </div>
            );
        },
        [handleCheckbox, selected]
    );

    const tableStructure = useMemo(() => {
        return [
            {
                key: "name",
                label: "Select",
                sortable: false,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: "name",
                label: "Candidate",
                sortable: false,
                render: (temp, all) => (
                    <div>
                        {all?.candidate?.name} <br/>
                        {all?.candidate?.email}
                    </div>
                ),
            },
            {
                key: "createdAt",
                label: "Interview Status",
                sortable: false,
                render: (temp, all) => <div><StatusPill status={Constants.INTERVIEW_STATUS_TEXT[all?.interview_status]}/></div>,
            },
            {
                key: "status",
                label: "Status",
                sortable: false,
                render: (temp, all) => (
                    <div>
                        <StatusPill status={Constants.JOB_CANDIDATE_STATUS_TEXT[all?.status]}/>
                    </div>
                ),
            },
            {
                key: "resume",
                label: "Last Updated",
                sortable: false,
                render: (temp, all) => (
                    <div>
                        {all?.updatedAtText}
                    </div>
                ),
            },
        ];
    }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);


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
            data: currentData,
            count: data.length,
            page: currentPage - 1,
            rowsPerPage: 10,
            allRowSelected: false,
            showSelection: false,
        };

        return {datatableFunctions, datatable};
    }, [
        tableStructure,
        handleSortOrderChange,
        handlePageChange,
        handleRowSize,
        currentData,
        currentPage,
        data,

    ]); // allData,

    return (
        <div className={styles.mainContainer}>
            <br/>
            <div>
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

                <div className={styles.stickbottom}>
                    <div className={styles.RequestShortlistWrapper}>
                        <div>
                            <p className={styles.heading3}>{selected.length} {selected.length === 1 || selected.length === 0 ? "Candidate" : "Candidates"} Selected</p>
                        </div>
                        <div className={styles.SlidebtnWrapper2}>
                            <div className={styles.editBtn2}>
                                <ButtonBase
                                    disabled={selected.length === 0 || isSubmitting}
                                    className={selected.length === 0 || isSubmitting ? styles.disabledBtnReject:styles.edit}
                                    onClick={() => {
                                        toggleConfirmDialog('REJECTED')
                                    }}
                                >
                                    REJECTED
                                </ButtonBase>
                                <ButtonBase disabled={selected.length === 0 || isSubmitting} onClick={() => {
                                    toggleConfirmDialog('SHORTLISTED')
                                }} className={selected.length === 0 || isSubmitting ? styles.disabledBtnReject :styles.edit}>SHORTLISTED</ButtonBase>
                            </div>
                            <div>
                                {canShortlist && (<ButtonBase  disabled={selected.length === 0 || isSubmitting} onClick={handleRequestShortlist}
                                                               className={selected.length === 0 || isSubmitting ? styles.disabledCreatebtn:styles.createBtn}>
                                    REQUEST SHORTLIST
                                </ButtonBase>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogComponent
                isOpen={isDialog}
                handleClose={toggleConfirmDialog}
                description={dialogText}
                handleConfirm={handleDialogConfirm}
            />
        </div>
    );
};

export default CandidateShortlistTable;
