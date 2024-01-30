/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, { Component, useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  IconButton,
  MenuItem,
  Slide,
  withStyles,
} from "@material-ui/core";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import StatusPill from "../Status/StatusPill.component";
import Constants from "../../config/constants";
import { useSelector } from "react-redux";
import FilterComponent from "../Filter/Filter.component";
import useCandidateInterviewTable from "./CandidateInterviewTable.hook";
import { Close } from "@material-ui/icons";
import CustomTextField from "../FormFields/TextField/TextField.component";
import CustomSelectField from "../FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../FormFields/DatePicker/CustomDatePicker";
import ScheduleInterviewDialogComponent from "./ScheduleInterviewDialog.component";

const CandidateInterviewTable = ({jobId, handleClose, isRecurring}) => {
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
      allData,
      data,
      isDialog,
      currentData,
      currentPage,
      isFetching,
      isSubmitting,
      toggleConfirmDialog,
    handleInterviewSchedule,
      interviewers
  } = useCandidateInterviewTable({ handleClose });

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback(
    (data) => {
      const selectedIndex = selected.findIndex((sel) => sel.id === data.id);
      return (
        <div className={styles.flex}>
          <Checkbox
            disabled={false}
            onChange={() => handleCheckbox(data)}
            checked={selectedIndex >= 0}
            value="secondary"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
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
      data: currentData,
      count: data.length,
      page: currentPage - 1,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
    currentData,
  ]); // allData,

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderWrapperContainer}>
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={[]}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <br />
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
        <div className={styles.stickBottom}>
          <div className={styles.RequestShortlistWrapper}>
            <div>
              <p className={styles.heading3}>{selected.length} Candidate Selected</p>
            </div>
            <div className={styles.SlidebtnWrapper2}>
              {(interviewers.length > 0) && (<ButtonBase
                  // disabled={selected.length === 0}
                onClick={toggleConfirmDialog}
                className={styles.createBtn}
              >
                SCHEDULE INTERVIEW
              </ButtonBase>)}
            </div>
          </div>
        </div>
      </div>
      <ScheduleInterviewDialogComponent isRecurring={isRecurring} jobId={jobId} selectedCandidates={selected} handleInterviewSchedule={handleInterviewSchedule} isOpen={isDialog} handleDialog={toggleConfirmDialog} />
    </div>
  );
};

export default CandidateInterviewTable;
