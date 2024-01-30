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
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, InfoOutlined } from "@material-ui/icons";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import usePendingEventList from "./PendingEventList.hook";

const PendingEventList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCreateFed,
    handleViewUpdate,
  } = usePendingEventList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.pending_event_list);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <img src={obj?.logo} alt="Logo Img" />
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "created",
        label: "CREATED BY",
        sortable: true,
        render: (value, all) => (
          <div>
            <b>{all?.createdBy?.name}</b>
            <br />
            {all?.createdBy?.full_contact}
          </div>
        ),
      },
      {
        key: "for",
        label: "CREATED FOR",
        sortable: false,
        render: (temp, all) => <div>{all?.organisedBy?.name}</div>,
      },
      {
        key: "name",
        label: "EVENT NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "date",
        label: "EVENT DATES",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.startDateText}-{all?.endDateText}
          </div>
        ),
      },
      {
        key: "logo",
        label: "LOGO",
        sortable: false,
        render: (temp, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "approved",
        label: "APPROVED BY",
        sortable: false,
        render: (temp, all) => (
          <div>
            <b>{all?.approvedBy?.name}</b>
            <br />
            {all?.approvedBy?.full_contact}
          </div>
        ),
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "action",
        label: "Action",
        style: { width: "15%" },
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
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
    <>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Event Approval List</span>
            <div className={styles.newLine} />
          </div>
        </div>

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
    </>
  );
};

export default PendingEventList;
