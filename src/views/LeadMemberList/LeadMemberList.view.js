import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
  Menu,
} from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import useLeadMemberList from "./LeadMemberList.hook";
import rejectPng from "../../assets/img/ic_reject@2x.png";
import acceptPng from "../../assets/img/ic_approve@2x.png";
import AcceptDialog from "./Component/AcceptPopUp/AcceptDialog.view";
import RejectDialog from "./Component/RejectedPopUp/RejectDialog";

const LeadMemberList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleCreateFed,
    isCalling,
    configFilter,
    toggleRejectDialog,
    toggleAcceptDialog,
    isRejectPopUp,
    isAcceptPopUp,
    dataValue,
    handleRejectApi,
  } = useLeadMemberList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.lead_member_list);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "email",
        label: "email",
        sortable: false,
        render: (temp, all) => <div>{all?.email}</div>,
      },
      {
        key: "number",
        label: "phone number",
        sortable: false,
        render: (temp, all) => <div>{all?.contact}</div>,
      },
      {
        key: "company",
        label: "member company",
        sortable: false,
        render: (temp, all) => <div>{all?.company_name}</div>,
      },
      {
        key: "chapter",
        label: "CHAPTER ASSOCIATED",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.chapter?.name ? all?.chapter?.name : "-"}</div>
        ),
      },
      {
        key: "on",
        label: "REQUESTED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "action",
        label: "action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtnSuccess"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                toggleAcceptDialog(all);
              }}
            >
              <img src={acceptPng} className={styles.rejct} />
              <div className={styles.subText}>APPROVE</div>
            </IconButton>
            <IconButton
              className={"tableActionBtnError"}
              color="error"
              disabled={isCalling}
              onClick={() => {
                toggleRejectDialog(all);
              }}
            >
              <img src={rejectPng} className={styles.rejct} />
              <div className={styles.subText}>REJECT</div>
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderStatus, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      // onRowSelection: this.handleRowSelection,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Members Users Request</span>
            <div className={styles.newLine} />
          </div>
        </div>
        <AcceptDialog
          isOpen={isAcceptPopUp}
          handleToggle={toggleAcceptDialog}
          candidateId={dataValue}
        />
        <RejectDialog
          handleConfirm={handleRejectApi}
          handleDialog={toggleRejectDialog}
          isOpen={isRejectPopUp}
        />
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default LeadMemberList;
